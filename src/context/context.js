import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

// Provider, Consumer - GithubContext.Provider

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  // request loading
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // error
  const [error, setError] = useState({ show: false, msg: '' });

  const searchGithubUser = async (user) => {
    console.log(user);
    toggleError(); //reset error because making api call
    setIsLoading(true);

    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );

    console.log(response);
    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;
      /*
      // repos
      // https://api.github.com/users/john-smilga/repos?per_page=100
      // you can also do it with axios(`${repos_url}?per_page=100`), repos_url can be retrieve from response.data
      axios(`${rootUrl}/users/${login}/repos?per_page=100`).then((response) =>
        // console.log(response)
        setRepos(response.data)
      );

      // followers
      // https://api.github.com/users/john-smilga/followers
      axios(`${followers_url}?per_page=100`).then((response) =>
        // console.log(response)
        setFollowers(response.data)
      );
*/
      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ]).then((results) => {
        console.log(results);

        const [repos, followers] = results;
        const status = 'fulfilled';

        // if something wrong with the api call, e.g. request url is incorrect, it will return 'rejected' for that specific call.
        // but it will still return array of 2. So you have to check the status of each one before you set the value.
        if (repos.status === status) {
          setRepos(results[0].value.data);
        }
        if (followers.status === status) {
          setFollowers(results[1].value.data);
        }
      });
      // It will wait for all three calls, users, repos and followers call to comeback before setting isLoading = false again.
    } else {
      toggleError(true, 'there is no user with that username');
    }
    checkRequests();
    setIsLoading(false);
  };

  // check rate
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        console.log(data); // data: {rate: {limit: 60, remaining: 60, reset: 1608613482, used: 0}}
        let {
          rate: { remaining },
        } = data;

        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, 'sorry, you have exceeded your hourly rate limit!');
        }
      })
      .catch((err) => console.log(err));
  };

  function toggleError(show = false, msg = '') {
    setError({ show, msg });
  }

  // error
  useEffect(checkRequests, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
