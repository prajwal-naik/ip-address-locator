import "../styles/MainApp.css"
import arrow from "../icon-arrow.svg"
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
// import LoaderRender from "./LoaderRender";

function MainApp({ setlocation }) {

        // const getData = async () => {
            

        //     // setIP(res.data.IPv4)
        // }

        useEffect( () => {
                
            //passing getData method to the lifecycle method
            // getData()
            axios.get('https://geolocation-db.com/json/')
            .then(res1 => {
                axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_2DUYugLRIrR3HJ6SAtFo8LIzIY4Qr&ipAddress=${res1.data.IPv4}`)
                .then(res => {
                    console.log(res);
                    setlocation([res.data.location.lat, res.data.location.lng].slice());
                    setIp(res.data.ip);
                    setdetailLocation(res.data.location.region + ' , ' + res.data.location.city);
                    setpostalCode(res.data.location.postalCode);
                    settimezone(res.data.location.timezone);
                    setISP(res.data.isp);
                    // console.log(loading);
                    setloading(false);
                    // var element = document.querySelector('div[id="mapid"]');
                    // console.log("Element found. Clicking.", element)
                    // simulateMouseClick(element)
                })
                }
            );
            // console.log("USING EFFECT");
            // setlocation([res.data.latitude, res.data.longitude].slice());

        }, [setlocation]);

    const [loading, setloading] = useState(false)
    const [Ip, setIp] = useState("-")
    const [postalCode, setpostalCode] = useState("-")
    const [detailLocation, setdetailLocation] = useState("-")
    const [timezone, settimezone] = useState("-")
    const [ISP, setISP] = useState("-")

 
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        // console.log(data.ipAddress);
        const ipReg = new RegExp('^(?:[0-9]{1,3}.){3}[0-9]{1,3}$');
        if(!ipReg.test(data.ipAddress)){
            alert("Enter valid IP Address");
            return;
        }
        setloading(true);
        // console.log("Loading: ", loading);
        setIp(data.ipAddress);
        axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_2DUYugLRIrR3HJ6SAtFo8LIzIY4Qr&ipAddress=${data.ipAddress}`)
        .then(res => {
            console.log(res);
            setlocation([res.data.location.lat, res.data.location.lng].slice());
            setIp(res.data.ip);
            setdetailLocation(res.data.location.region + ' , ' + res.data.location.city);
            setpostalCode(res.data.location.postalCode);
            settimezone(res.data.location.timezone);
            setISP(res.data.isp);
            // console.log(loading);
            setloading(false);
            // var element = document.querySelector('div[id="mapid"]');
            // console.log("Element found. Clicking.", element)
            // simulateMouseClick(element)
        })
        // .finally(
        //     setloading(false)
        // );
    }

    return (
        <div className = "mainApp">
            <div className="mainTitle">
                <p>IP Address Tracker</p>
            </div>
            
            <div className="inputDiv">
                {/* <div className="inputDivContainer"> */}
                    <form onSubmit = {handleSubmit(onSubmit)}>
                        <input type = "text" id = "ipInput" {...register("ipAddress", { required: true })} className = "ipInput" placeholder="Search IP"/>
                        <button type = "submit" className="submitButton">
                            <img src = {arrow} alt = "submitArrow"/>
                        </button>
                    </form>
                {/* </div> */}
                
            </div>
                    {/* {errors.ipAddress && <span style = {{fontSize: "18px", color: "pink"}}>This field is required</span>} */}

            <div className="detailsDisplay">
                <div className="detailsDisplayContainer">
                    <div className="ipAddress">
                        <div className="detailTitle">
                            <p>ip address</p>
                        </div>
                        <div className="detailStat">
                            <p>{Ip}</p>
                        </div>
                    </div>
                    <div className="location">
                        <div className="detailTitle">
                            <p>location</p>
                        </div>
                        <div className="detailStat">
                            {
                                loading?<Loader type="ThreeDots" color="black" height={50} width={50} /> 
                                    : <p>{detailLocation}<br/>{postalCode}</p>
                            }
                            {/* <p>{detailLocation}<br/>{postalCode}</p> */}
                        </div>
                    </div>
                    <div className="timeZone">
                        <div className="detailTitle">
                            <p>timezone</p>
                        </div>
                        <div className="detailStat">
                            {/* <p>UTC<br/>{timezone}</p> */}
                            {
                                loading?<Loader type="ThreeDots" color="black" height={50} width={50} /> 
                                    : <p><span id = "utc">UTC<br/></span>{timezone}</p>
                            }
                        </div>
                    </div>
                    <div className="isp">
                        <div className="detailTitle">
                            <p>isp</p>
                        </div>
                        <div className="detailStat">
                            {/* <p>SpaceX<br/>Starlink</p> */}
                            {/* <p>{ISP}</p> */}
                            {
                                loading?<Loader type="ThreeDots" color="black" height={50} width={50} /> 
                                    : <p>{ISP}</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainApp
