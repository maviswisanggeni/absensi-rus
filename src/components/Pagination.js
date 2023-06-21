import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateStateKehadiran } from '../features/kehadiranSlice';
const Pagination = props => {

  let [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch()

  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('paginate', currentPage + 1);

    setSearchParams(newSearchParams);
    dispatch(updateStateKehadiran({ name: 'isPaginationClicked', value: true }))
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('paginate', currentPage - 1);

    setSearchParams(newSearchParams);
    dispatch(updateStateKehadiran({ name: 'isPaginationClicked', value: true }))
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber, key) => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li key={key}
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => {
              onPageChange(pageNumber);
              const newSearchParams = new URLSearchParams(searchParams);
              newSearchParams.set('paginate', pageNumber);

              setSearchParams(newSearchParams);
              dispatch(updateStateKehadiran({ name: 'isPaginationClicked', value: true }))
            }}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;