import React from "react";
import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import coronaLogo from "./images/covid.png";


class App extends React.Component {
    // State Object Stores Initial Empty Data Objects To Be Populated Later
    state = {
        data: {},
        country: '',
    }

    async componentDidMount(){
        // Original State Of Data (Global) Before User Selects Any Country
        const fetchedData = await fetchData();
        this.setState({data: fetchedData});
    }

    // Method To Change State Of Data Dynamically Based On Country
    handleCountryChange = async (country) => {
        // Fetch The Data
        const fetchedData = await fetchData(country);
        // Set The State For Data, AND The Country Selected By The User
        this.setState({data: fetchedData, country: country});
    }

    render() {
        //Destructuring Data
        const { data, country } = this.state;

        return (
            <div className={styles.container}>
                <img className={styles.image} src={coronaLogo} alt="Covid-19" />
                <Cards data={ data }/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={ data } country={country}/>
            </div>
        )
    }
}

export default App;