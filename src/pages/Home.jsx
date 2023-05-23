import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Accordion, Loader, Pagination } from '../components/Global';
import Header from '../components/Global/Header';
import { AccordionBody, TimeRange } from '../components/Home';
import { onGitDataStart } from '../store/git/gitSlice';

const ONE_WEEK_BEFORE_DATE = new Date(
  new Date().setDate(new Date().getDate() - 7)
);

// Home page
const Home = () => {
  // Inits
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get('page') || 1);
  const [openAccordions, setOpenAccordions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(ONE_WEEK_BEFORE_DATE);
  const [selectedInput, setSelectedInput] = useState(7);
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
    dispatch(onGitDataStart({ page: pageNo, selectedDate }));
    setOpenAccordions([]);
    navigate({
      pathname: '/',
      search: `page=${pageNo}`,
    });
  };

  //Fetch the github repos according to the date
  const dateChangeHandler = (event) => {
    const { value } = event.target;
    const userSelectedDate = new Date(
      new Date().setDate(new Date().getDate() - Number(value))
    );
    setSelectedInput(value);
    setSelectedDate(userSelectedDate);
    dispatch(
      onGitDataStart({ page: currentPage, selectedDate: userSelectedDate })
    );
  };

  // For fetch the initial page repos
  useEffect(() => {
    dispatch(onGitDataStart({ page: 1, selectedDate }));
  }, [dispatch]);

  // Loader configuration
  if (isLoading) {
    return <Loader />;
  }

  // JSX
  return (
    <>
      <Header />
      <div className="text-center m-2">
        <TimeRange
          dateChangeHandler={dateChangeHandler}
          selectedInput={selectedInput}
        />
      </div>
      <main className="max-w-[1200px] mx-auto flex flex-col gap-3 py-10 px-4">
        {gitHubData.items.map((gitRepo, index) => {
          return (
            <Accordion
              gitRepo={gitRepo}
              key={index}
              index={index}
              toggleAccordionHandler={toggleAccordionHandler}
              openAccordions={openAccordions}
            >
              {openAccordions.includes(index) && (
                <AccordionBody gitRepo={gitRepo} />
              )}
            </Accordion>
          );
        })}
      </main>
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
