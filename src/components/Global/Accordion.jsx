import { Arrow } from '../svgs/svg';

// Main accordion page
const Accordion = (props) => {
  // Inits
  const { gitRepo, children, index, toggleAccordionHandler } = props;
  const userName =
    gitRepo.owner.url.split('/')[gitRepo.owner.url.split('/').length - 1];

  // JSX
  return (
    <div className="accordion bg-[#e9ecef] p-8 rounded-lg cursor-pointer ">
      <div
        className="accordion-header flex  items-center justify-between"
        onClick={() => toggleAccordionHandler(index)}
      >
        <div className="flex items-center">
          <div className="left">
            <img
              src={gitRepo.owner.avatar_url}
              alt="Avatar"
              className="h-24 w-24 rounded-lg"
            />
          </div>
          <div className="right ml-8">
            <p className="repo-name font-semibold text-xl mb-2">
              {gitRepo.full_name}
            </p>
            <p className="description mb-1">{gitRepo.description}</p>
            <div className="details flex items-center gap-3">
              <span className="border border-solid border-[#ced4da98] px-2 py-1 rounded">
                stargazers: {gitRepo.stargazers_count}
              </span>
              <span className="border border-solid border-[#ced4da98] px-2 py-1 rounded">
                Open issues: {gitRepo.open_issues_count}
              </span>
              <p className="opacity-50">{`Last pushed ${gitRepo.pushed_at} by ${userName}`}</p>
            </div>
          </div>
        </div>
        <div className="accordion-arrow">
          <Arrow />
        </div>
      </div>
      <div className="accordion-body">{children}</div>
    </div>
  );
};

export default Accordion;
