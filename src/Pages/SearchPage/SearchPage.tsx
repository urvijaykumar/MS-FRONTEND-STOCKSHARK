import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { CompanySearch } from "../../Models/CompanySearch";
import Navbar from "../../Components/Navbar/Navbar";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import CardList from "../../Components/CardList/CardList";
import Search from "../../Components/Search/Search";
import { searchCompanies } from "../../Api/Api";

interface Props {}

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e);
  };
  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await searchCompanies(search);
    if (typeof result === "string") {
      setServerError(result);
    } else if (result && Array.isArray(result.data)) {
      setSearchResult(result.data);
      console.log(searchResult); // Log the value of searchResult
    }
  };
  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    const exist = portfolioValues.find((value) => value === e.target[0].value);
    if (exist) return;
    const updatedPortfolio = [...portfolioValues, e.target[0].value];
    setPortfolioValues(updatedPortfolio);
  };
  const onPortfolioDelete = (e: any) => {
    const filterPortfolio = portfolioValues.filter((item) => {
      return item !== e.target[0].value;
    });
    setPortfolioValues(filterPortfolio);
  };

  return (
    <>
      <Search
        onSearchSubmit={onSearchSubmit}
        search={search}
        handleSearchChange={handleSearchChange}
      />
      <ListPortfolio
        portfolioValues={portfolioValues}
        onPortfolioDelete={onPortfolioDelete}
      />
      {serverError ? <h1>{serverError}</h1> : <></>}
      <CardList
        searchResults={searchResult}
        onPortfolioCreate={onPortfolioCreate}
      />
    </>
  );
};

export default SearchPage;
