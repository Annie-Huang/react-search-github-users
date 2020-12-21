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
  let languages = repos.reduce((total, item) => {
    // console.log(item);
    const { language } = item;
    console.log(language);

    if (!language) return total; // Need to filter of language === null;

    // use object so it will have duplicate key.
    if (!total[language]) {
      // total[language] = 1;
      total[language] = { label: language, value: 1 };
    } else {
      // total[language]++;
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
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
    */

    return total;
  }, {});

  languages = Object.values(languages);
  console.log(languages); // convert it back into array: [{label: "JavaScript", value: 45}, {label: "CSS", value: 38}, {label: "HTML", value: 14]

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

  // Click on the Pie can remove out that pie portion.
  return (
    <section className='section'>
      <Wrapper className='section-center'>
        {/* <ExampleChart data={chartData} /> */}
        <Pie3D data={chartData} />
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
