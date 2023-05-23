import { useEffect, useState } from 'react';

// For display the contributor and code frequency
const AccordionBody = (props) => {
  // inits
  const { gitRepo } = props;
  const [commitActivity, setCommitActivity] = useState([]);
  const [contributorData, setContributorData] = useState([]);

  // Fetching the contributors in code
  const fetchContributorHandler = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${gitRepo.owner.login}/${gitRepo.name}/stats/contributors`
      );
      const data = await response.json();
      Object.keys(data).length > 0
        ? setContributorData(data)
        : setContributorData([]);
    } catch (err) {
      console.error('Error in contributors data', err);
    }
  };

  // Fetching the commits in code
  const fetchCommitsHandler = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${gitRepo.owner.login}/${gitRepo.name}/stats/code_frequency`
      );
      const data = await response.json();
      Object.keys(data).length > 0
        ? setCommitActivity(data)
        : setCommitActivity([]);
    } catch (err) {
      console.error('Error in commits data', err);
    }
  };

  //use effect Fetching of commit and contributor data
  useEffect(() => {
    fetchContributorHandler();
    fetchCommitsHandler();
  }, []);

  return <div>AccordionBody</div>;
};

export default AccordionBody;
