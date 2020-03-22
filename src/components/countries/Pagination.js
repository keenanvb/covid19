import React from 'react'

const Pagination = ({ countriesPerPage, allCountries, paginate, activePagination, setActivePagination }) => {
    let pageNumbers = []

    for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <div className="pagination" >
            <ul >
                {pageNumbers.map((number) =>
                    <li key={number}>
                        <div className={`${activePagination === number ? 'active-pagination' : ''}`} onClick={() => {
                            paginate(number);
                            setActivePagination(number);
                        }}>
                            {number}
                        </div>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Pagination
