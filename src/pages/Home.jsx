import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader, Pagination, Accordion } from '../components/Global';
import Header from '../components/Global/Header';
import { onGitDataStart } from '../store/git/gitSlice';
import { AccordionBody } from '../components/Home';

// Home page
const Home = () => {
  // Inits
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get('page') || 1);
  const [openAccordions, setOpenAccordions] = useState([]);
  const { isLoading, gitHubData } = useSelector(
    (state) => state.gitSliceReducer
  );

  //Handling the toggling of the accordions
  const toggleAccordionHandler = (accordionIndex) => {
    if (openAccordions.includes(accordionIndex)) {
      setOpenAccordions((prevState) =>
        prevState.filter(
          (singleAccordionIndex) => singleAccordionIndex !== accordionIndex
        )
      );
    } else {
      setOpenAccordions([...openAccordions, accordionIndex]);
    }
  };

  // For handle the change of page based on pagination
  const pageChangeHandler = (pageNo) => {
    setCurrentPage(pageNo);
    dispatch(onGitDataStart(pageNo));
    setOpenAccordions([]);
    navigate({
      pathname: '/',
      search: `page=${pageNo}`,
    });
  };

  // For fetch the initial page repos
  useEffect(() => {
    dispatch(onGitDataStart(1));
  }, [dispatch]);

  // Loader configuration
  if (isLoading) {
    return <Loader />;
  }

  // JSX
  return (
    <>
      <Header />
      <div className="max-w-[1200px] mx-auto flex flex-col gap-3 py-10">
        {gitHubData.items.map((gitRepo, index) => {
          return (
            <Accordion
              gitRepo={gitRepo}
              key={index}
              index={index}
              toggleAccordionHandler={toggleAccordionHandler}
            >
              <AccordionBody />
            </Accordion>
          );
        })}
      </div>
      <Pagination
        totalAmount={400}
        paginationAmount={30}
        currentPage={+currentPage}
        pageChangeHandler={pageChangeHandler}
      />
    </>
  );
};

export default Home;
