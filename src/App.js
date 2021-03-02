import React from "react";
import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";


class App extends React.Component {
    // State Object Stores Initial Empty Data Object To Be Populated Later
    state = {
        data: {},
    }

    async componentDidMount(){
        const fetchedData = await fetchData();
        this.setState({data: fetchedData});
    }

    render() {
        //Destructuring Data
        const { data } = this.state;

        return (
            <div className={styles.container}>
                <Cards data={ data }/>
                <CountryPicker />
                <Chart />
            </div>
        )
    }
}

export default App;