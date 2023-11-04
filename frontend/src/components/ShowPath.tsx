// ActiveLastBreadcrumb.js
import {  useLocation } from 'react-router-dom';
import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const ShowPath = () => {
  //Extract the path of the last visited pade
  const location = useLocation();
  const currentPath = location.pathname;

  const lastPage = currentPath.substring(currentPath.lastIndexOf("/") + 1);
  const pageList = currentPath.split("/");
  pageList.shift();

  console.log(currentPath);

  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>

          {pageList.map((e) => {
              return (
                <Link underline="hover" color="inherit" href={currentPath}>
                  {e}
                </Link>
              );
            })}

      </Breadcrumbs>
    </div>
  );
}
export default ShowPath;