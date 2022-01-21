import React from "react";
import L from "leaflet";
import {
  Button,
  Typography,
  TextInput,
  Paginate,
  ButtonGroup,
  RentalCard,
  SideNav,
  MobileNavbar,
} from "mosaic";
import { rentals, navItemsTop, navItemsBottom } from "mosaic";

import { FiGrid, FiList, FiSearch, FiStar, FiX } from "react-icons/fi";
import classNames from "classnames";
import { useWindowWidth } from "@react-hook/window-size";

import useDarkMode from "./hooks/useDarkMode";
import { Filters, RentalMap } from "./components";

type RentalSortOption = "date" | "price";
type ViewOption = "list" | "grid";

const App = () => {
  const { darkMode } = useDarkMode({ forceDark: false });
  const [searchString, setSearchString] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rentalSortOption, setRentalSortOption] =
    React.useState<RentalSortOption>("date");
  const [viewOption, setViewOption] = React.useState<ViewOption>("list");
  const [open, setOpen] = React.useState<boolean>(false);

  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 1024;
  const isLargerDesktop = windowWidth > 1536;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const markerCoordinates: L.LatLngExpression[] = rentals.map(
    (rental) => rental.coordinates
  );
  const bounds: L.LatLngBounds = L.latLngBounds(markerCoordinates);

  return (
    <div
      className={classNames("flex h-screen", {
        "dark bg-gray-900": darkMode,
        "flex-col": isMobile,
        "flex-row": !isMobile,
      })}
    >
      {isMobile ? <MobileNavbar open={open} toggleOpen={handleToggle} /> : null}

      <SideNav
        className={classNames("relative z-50 min-h-screen", {
          "-mt-20 absolute": open && isMobile,
          hidden: !open && isMobile,
        })}
        navItemsTop={navItemsTop}
        navItemsBottom={navItemsBottom}
        open={open}
        setOpen={handleToggle}
        username='Veronica Woods'
        email='veronica@example.com'
      />

      {open && isMobile ? (
        <div
          className='fixed top-0 left-0 z-40 w-screen h-screen bg-gray-500 cursor-pointer bg-opacity-80'
          onClick={() => setOpen(false)}
        >
          <FiX size={40} className='fixed text-white top-5 right-9' />
        </div>
      ) : null}

      <div
        className={classNames(
          "w-full overflow-y-auto grid grid-cols-1 2xl:grid-cols-5",
          {
            "fixed top-20": isMobile && open,
          }
        )}
      >
        <div className='mx-8 mt-10 2xl:col-span-3'>
          <div className='flex flex-col justify-between md:flex-row'>
            <div>
              <Typography variant='h5' customWeight='medium'>
                109 stays in Amsterdam
              </Typography>

              <Typography
                variant='lg'
                customColor='text-gray-500 dark:text-gray-300'
              >
                Book your next stay at one of our properties.
              </Typography>
            </div>

            <div className='flex mt-6 space-x-4 md:mt-0'>
              <Button size='sm' variant='secondaryGray'>
                Share
              </Button>

              <Button
                size='sm'
                LeadingIcon={<FiStar size={20} />}
                variant='primary'
              >
                Save search
              </Button>
            </div>
          </div>

          <hr className='mt-6 mb-3 border-t border-gray-300 2xl:my-6 md:mt-5 dark:border-opacity-20' />

          <div className='2xl:hidden'>
            <RentalMap rentals={rentals} bounds={bounds} />

            <div className='mb-3' />
          </div>

          <Filters />

          <div className='flex justify-between'>
            <div className='flex-grow md:mr-7'>
              <TextInput
                type='text'
                value={searchString}
                handleChange={handleSearch}
                placeholder='Search'
                LeadingIcon={<FiSearch />}
              />
            </div>

            <div className='items-center hidden space-x-2 md:flex'>
              <Button size='md' variant='secondary'>
                Clear
              </Button>

              <Button size='md' variant='primary'>
                Search
              </Button>
            </div>
          </div>
          <span />

          <div className='flex flex-col justify-between mb-5 space-y-3 xs:space-y-0 xs:flex-row mt-7 md:mt-8'>
            <div className='flex'>
              <ButtonGroup
                active={rentalSortOption}
                options={[
                  {
                    content: "Sort by date",
                    value: "date",
                  },
                  {
                    content: "Sort by price",
                    value: "price",
                  },
                ]}
                setActive={setRentalSortOption}
              />
            </div>
            <div className='flex'>
              <ButtonGroup
                active={viewOption}
                options={[
                  {
                    content: <FiList size={20} />,
                    value: "list",
                  },
                  {
                    content: <FiGrid size={20} />,
                    value: "grid",
                  },
                ]}
                setActive={setViewOption}
              />
            </div>
          </div>

          <div className='mb-5 space-y-3'>
            {rentals.map((rental) => (
              <RentalCard key={rental.id} rental={rental} />
            ))}
          </div>

          <Paginate
            isMobile={isMobile}
            page={page}
            setPage={(page) => setPage(page)}
            totalPages={10}
            className='mb-5.5'
          />
        </div>
        {isLargerDesktop ? (
          <div className='mt-10 mr-8 2xl:col-span-2'>
            <RentalMap rentals={rentals} bounds={bounds} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
