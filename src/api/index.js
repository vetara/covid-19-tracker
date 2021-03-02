// This File Contains Functions For Fetching Data From API

import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
    let changeableUrl = url;

    // If Country Is Provided As A Parameter, Connect To API Endpoint Belonging To Specified Country, Else Connect To Original Url
    if (country) {
        changeableUrl = `${url}/countries/${country}`
    }

    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl); /* This Returns JSON Object With Multiple Fields
                                                                                                        But We Destructure The data Field Only, From The Response 
                                                                                                        In Order To Isolate The Required Data Only
                                                                                                       */
        
        // Object To Store The Data
        const modifiedData = {
            confirmed: confirmed,
            recovered: recovered,
            deaths: deaths,
            lastUpdate: lastUpdate
        }
        return modifiedData;

    } catch (error) {
        
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }))
        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchCountries = async () => {
    try {
        const { data: {countries} } = await axios.get(`${url}/countries`);
        return countries.map((country) => country.name);
    } catch (error) {
        console.log(error);
    }
}