import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const { repos } = React.useContext(GithubContext);
  // console.log(repos);

  /*
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  array1.reduce(reducer, initialValue); 
  */
  const languages = repos.reduce((total, item) => {
    // console.log(item);
    const { language, stargazers_count } = item;
    // console.log(language);

    if (!language) return total; // Need to filter of language === null;

    // use object so it will have duplicate key.
    if (!total[language]) {
      // total[language] = 1;
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      // total[language]++;
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }
    // console.log(total); // e.g. {JavaScript: 45, CSS: 38, HTML: 14}

    // console.log(total);
    /* 
    change it into this format:
    {
      CSS: {label: "CSS", value: 38},
      HTML: {label: "HTML", value: 14},
      JavaScript: {label: "JavaScript", value: 45},
    }
    {
      CSS: {label: "CSS", value: 38, stars: 412},
      HTML: {label: "HTML", value: 14, stars: 34},
      JavaScript: {label: "JavaScript", value: 45, stars: 376},
    }
    */

    return total;
  }, {});

  /*
  languages = Object.values(languages);
  console.log(languages); // convert it back into array: [{label: "JavaScript", value: 45}, {label: "CSS", value: 38}, {label: "HTML", value: 14]
 */
  const mostUsed = Object.values(languages)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
  // console.log(languages); // sort by descending order and get the first 5 items:  [{label: "JavaScript", value: 45}, {label: "CSS", value: 38}, {label: "HTML", value: 14}]
  // console.log(mostUsed);

  // most stars per language
  const mostPopular = Object.values(languages)
    .sort((a, b) => b.stars - a.stars)
    .map((item) => ({ ...item, value: item.stars })) // copy values in property stars into property value
    .slice(0, 5);
  // console.log(mostPopular); // [{label: "CSS", value: 412, stars: 412}, {label: "JavaScript", value: 376, stars: 376}, {label: "HTML", value: 34, stars: 34}]

  // stars, forks
  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item;

      // I think this is the wrong setup, what happens if you got two repo that has the same number of stars count, the later one will override the previous one.
      total.stars[stargazers_count] = { label: name, value: stargazers_count };

      return total;
    },
    {
      stars: {},
      forks: {},
    }
  );
  console.log(stars);
  /* The format will be: {
    ...
    59: {label: "js-cart-setup", value: 59}
    79: {label: "react-phone-e-commerce-project", value: 79}
    127: {label: "react-beach-resort-project", value: 127}
    206: {label: "javascript-basic-projects", value: 206}
  }
  */

  const chartData = [
    {
      label: 'HTML',
      value: '13',
    },
    {
      label: 'CSS',
      value: '160',
    },
    {
      label: 'Javascript',
      value: '80',
    },
  ];

  // Click on the Pie or Doughnut can remove out that pie portion.
  return (
    <section className='section'>
      <Wrapper className='section-center'>
        {/* <ExampleChart data={chartData} /> */}
        <Pie3D data={mostUsed} />
        <Column3D data={chartData} />
        <Doughnut2D data={mostPopular} />
        <Bar3D data={chartData} />
        <div></div>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
