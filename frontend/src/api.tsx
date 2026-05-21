import axios from "axios";

import {
  CompanyBalanceSheet,
  CompanyCashFlow,
  CompanyIncomeStatement,
  CompanyKeyMetrics,
  CompanyProfile,
  CompanySearch,
} from "./company";

export interface SearchResponse {
  result: CompanySearch[];
}

const api = axios.create({
  baseURL: "https://finnhub.io/api/v1",
});

const API_KEY = process.env.REACT_APP_API_KEY;

export const searchCompanies = async (query: string) => {
  try {
    const response = await api.get<SearchResponse>(
      `/search?q=${query}&token=${API_KEY}`
    );

    return response.data.result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message:", error.message);
      return [];
    }

    console.log("unexpected error:", error);
    return [];
  }
};

export const getCompanyProfile = async (query: string) => {
  try {
    const response = await api.get<CompanyProfile>(
      `/stock/profile2?symbol=${query}&token=${API_KEY}`
    );

    return response.data;
  } catch (error: any) {
    console.log("error message:", error.message);
    return null;
  }
};

export const getKeyMetrics = async (query: string) => {
  try {
    const response = await api.get<CompanyKeyMetrics>(
      `/stock/metric?symbol=${query}&metric=all&token=${API_KEY}`
    );

    return response.data;
  } catch (error: any) {
    console.log("error message:", error.message);
    return null;
  }
};

export const getIncomeStatement = async (query: string) => {
  try {
    const response = await api.get(
      `/stock/financials-reported?symbol=${query}&token=${API_KEY}`
    );

    return response.data.data as CompanyIncomeStatement[];
  } catch (error: any) {
    console.log("error message:", error.message);
    return [];
  }
};

export const getBalanceSheet = async (query: string) => {
  try {
    const response = await api.get(
      `/stock/financials-reported?symbol=${query}&token=${API_KEY}`
    );

    return response.data.data as CompanyBalanceSheet[];
  } catch (error: any) {
    console.log("error message:", error.message);
    return [];
  }
};

export const getCashFlow = async (query: string) => {
  try {
    const response = await api.get(
      `/stock/financials-reported?symbol=${query}&token=${API_KEY}`
    );

    return response.data.data as CompanyCashFlow[];
  } catch (error: any) {
    console.log("error message:", error.message);
    return [];
  }
};