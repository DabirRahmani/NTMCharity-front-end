import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import TelegramIcon from '@material-ui/icons/Telegram';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import HomeIcon from '@material-ui/icons/Home';
import home from '../home/home';

const mainpage =()=>
{
    return(
        <dive>
            <div>
            <AppBar position="static">
             <Toolbar style={{whiteSpace: "nowrap", marginBottom: "1%",marginTop: "1%"}}>
                 <AllInclusiveIcon style={{fontSize:"50px",paddingRight:"10px"}}>
                 </AllInclusiveIcon>
                <Typography style={{fontSize:"30px",fontFamily: "Spicy Rice",color: "pink"}}>
                NTM CHARITY!
                </Typography>
                <button href="/" style={{marginLeft:"68%", backgroundColor: "salmon"}}
                 >
                 GoHome
                 </button>
                 <HomeIcon style={{fontSize: "10vh", color: "salmon", marginLeft: "1.5%"}}/>
                </Toolbar>
             </AppBar>
            </div>
            <div style={{paddingTop: "2%", backgroundColor: "#bbf0f7",fontfamily: "serif", paddingBottom: "5%",direction: "ltr"}}>
                <h1 style={{paddingTop: "1%" , whiteSpace: "nowrap", marginLeft: "6%", fontSize: "5vh", fontWeight: "bold",}}>
                Site introduction:
                <AccountBalanceIcon style={{color: "#22227d", fontSize: "10vh", marginLeft: "70%"}}/>
                </h1>
                <p style={{direction:"ltr", fontSize: "4vh", marginLeft: "7%", whiteSpace: "normal",marginRight: "7%",fontFamily: "Spicy Rice"}}>
                Hello everyone
                <br/>
                Thank you for your look…
                <br/>
                Our site is for charity build and we want to help every one in every wherein our country who need.in our site you can makes a lot of events and you can make event for every act of god wich damaged lots of people in a city or village or in every parts of country …
                In our site every needy people can whatch the store list of things that donators pull them in the site and they can choose what they want and then they request is going over by charity owner and if needy is really need that product he or she can get it …

                </p>
            </div>
            
            <div style={{paddingTop: "2%", backgroundColor: "#ffc5c5",direction: "ltr",fontfamily: "serif", paddingBottom: "1%"}}>
            <h1 style={{paddingTop: "1%" , whiteSpace: "nowrap", marginLeft: "6%", fontSize: "4.5vh", fontWeight: "bold"}}>
            About us:
            <AllInclusiveIcon style={{color: "#da0a6bf0", fontSize: "10vh", marginLeft: "80%"}}/>
                </h1>
                <p style={{direction:"ltr", fontSize: "3vh", marginLeft: "7%", whiteSpace: "normal",marginRight: "7%",fontFamily: "Spicy Rice"}}>
                We are a group wich study in Iran university of sience and tech in computer engeneiring 
                </p>
                <ul style={{fontSize: "4vh", fontWeight: "revert", paddingLeft: "10%",fontFamily: "Spicy Rice"}}>
                    <li>
                    The name of the group:noisy trouble makers
                    </li>
                    <li>
                    Front end by: Amin MirAbadi-Mohammad Dabir-Zahra Mahmoodzadeh
                    </li>
                    <li>
                    Backend by: Ehsan Karbasian-Amirreza Satarzadeh 
                    </li>
                </ul>
                </div>
                <div style={{paddingTop: "2%", backgroundColor: "#18456d",direction: "ltr",fontfamily: "serif", paddingBottom: "1%"}}>
                <h1 style={{paddingTop: "1%" , whiteSpace: "nowrap", marginLeft: "6%", fontSize: "3vh", fontWeight: "bold"}}>
                Connection with us:
              
                </h1> 
                <p style={{direction:"ltr", fontSize: "3vh", marginRight: "7%", whiteSpace: "normal",marginLeft: "7%",fontFamily: "Spicy Rice"}}>
                You can actually find us in the computer faculty in IUST. 
                <div style={{marginLeft:"87%", color: "#3d064af0"}}>
                <PhoneIcon style={{ fontSize: "5vh"}}/>
                <EmailIcon style={{ fontSize: "5vh"}}/>
                <TelegramIcon style={{ fontSize: "5vh"}}/>
                <TwitterIcon style={{fontSize: "5vh"}}/>
                <InstagramIcon style={{ fontSize: "5vh"}}/>
                </div>
                </p>

            </div>
        </dive>
    )
}
export default mainpage;