import React, {useState, useEffect } from "react";
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
import { useHistory} from 'react-router-dom';
import photo from '../img/blue.jpg';
import GitHubIcon from '@material-ui/icons/GitHub';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LockOpenIcon from '@material-ui/icons/LockOpen';
const Mainpage =()=>
{
    const history = useHistory();
    const SignUp =()=>{
        history.push("/signup")
      }
    return(
        <div>
             <img src={photo} 
        style={{
            position:"fixed",
             width:"100%",
             height:"100%",
             objectFit:"inherit",
             zIndex:"-1"
      }}
        />
                
            <AppBar position="static" style={{backgroundColor:"#78a6c1"}}>
             <Toolbar style={{whiteSpace: "nowrap", marginBottom: "1%",marginTop: "1%"}}>
                 <AllInclusiveIcon style={{fontSize:"50px",paddingRight:"10px"}}>
                 </AllInclusiveIcon>
                <Typography style={{fontSize:"30px",fontFamily:"Dancing Script",marginLeft:"3vh"}}>
                NTM CHARITY!
                </Typography>
                <button style={{marginLeft:"68%", backgroundColor: "#b7def5",fontFamily:"Orelega One",color:"WHITE"}}
                 onClick={SignUp}
                 >
                 Sign Up
                 </button>
                 <LockOpenIcon color="inherit" style={{fontSize: "5vh", marginLeft: "1%"}}/>
                </Toolbar>
             </AppBar>
           
        <div>
        <h1 style={{paddingTop: "1%" , whiteSpace: "nowrap", marginLeft: "6%", fontSize: "5vh", fontWeight: "bold",fontFamily:"Mate SC"}}>
        FIVE REASONS TO GIVE TO CHARITY:
                </h1>
                <p style={{direction:"ltr", fontSize: "4vh", marginLeft: "7%", whiteSpace: "normal",marginRight: "7%",fontFamily: "Mate SC"}}>
                Donating to the causes you care about not only benefits the charities themselves, it can be deeply rewarding for you too. Millions of people give to charity on a regular basis to support causes they believe in, as well as for the positive effect it has on their own lives.
                <br/>
                So why is giving to charity so gratifying? We’ve taken a closer look at five reasons to donate to your charities of choice.   
                <br/>
                </p>
                <h2 style={{paddingTop: "1%" , whiteSpace: "nowrap", marginLeft: "6%", fontSize: "4vh", fontWeight: "bold",fontFamily:"Mate SC"}}>
                1 GIVING TO CHARITY MAKES YOU FEEL GOOD:
                </h2>
                <p style={{direction:"ltr", fontSize: "4vh", marginLeft: "7%", whiteSpace: "normal",marginRight: "7%",fontFamily: "Mate SC"}}>
                Donating to charity is a major mood-booster. The knowledge that you’re helping others is hugely empowering and, in turn, can make you feel happier and more fulfilled. Research has identified a link between making a donation to charity and increased activity in the area of the brain that registers pleasure - proving that as the old adage goes, it really is far better to give than to receive.

Our own research into why people give supports this. We asked 700 of our generous donors to tell us what motivates them to give regularly to charity; 42% agreed the enjoyment they receive from giving as a key influence. 
                </p>
                <h2 style={{paddingTop: "1%" , whiteSpace: "nowrap", marginLeft: "6%", fontSize: "4vh", fontWeight: "bold",fontFamily:"Mate SC"}}>
                2 GIVING TO CHARITY STRENGTHENS PERSONAL VALUES:
                </h2>
                <p style={{direction:"ltr", fontSize: "4vh", marginLeft: "7%", whiteSpace: "normal",marginRight: "7%",fontFamily: "Mate SC"}}>
                In our research, Why we give, a feeling of social conscience was the most widely-given reason to give to charity. Whatever type of charity work they supported, 96% said they felt they had a moral duty to use what they had to help others, a sentiment very much rooted in their personal values and principles.

Having the power to improve the lives of others is, to many people, a privilege, and one that comes with its own sense of obligation. Acting on these powerful feelings of responsibility is a great way to reinforce our own personal values and feel like we’re living in a way that is true to our own ethical beliefs
                </p>
                <h2 style={{paddingTop: "1%" , whiteSpace: "nowrap", marginLeft: "6%", fontSize: "4vh", fontWeight: "bold",fontFamily:"Mate SC"}}>
                3 GIVING IS MORE IMPACTFUL THAN EVER:
                </h2>
                <p style={{direction:"ltr", fontSize: "4vh", marginLeft: "7%", whiteSpace: "normal",marginRight: "7%",fontFamily: "Mate SC"}}>
                Many people are concerned that their donations to charity may be reduced by tax or administrative costs, preventing the full amount from reaching the people or causes they really want to help. Thankfully there are ways to make the most of every donation to charity.

If you’re a UK taxpayer, you can boost the amount of every donation you make by giving through Gift Aid, an Income Tax relief created to help charities get the most out of the funds they receive. As Gift Aid enables the charity to recover the basic rate of tax on your donation, the scheme adds 25p to each £1 you give at no extra cost to you.

There are many other ways to give to charity tax-effectively too, such as by donating straight from your salary before tax is deducted through a payroll giving scheme, donating shares to charity or leaving a charitable legacy in your Will. These methods of giving ensure your chosen charities benefit as much as possible from your support.
                </p>
                <h2 style={{paddingTop: "1%" , whiteSpace: "nowrap", marginLeft: "6%", fontSize: "4vh", fontWeight: "bold",fontFamily:"Mate SC"}}>
                4 GIVING TO CHARITY INTRODUCES YOUR CHILDREN TO THE IMPORTANCE OF GENEROSITY:
                </h2>
                <p style={{direction:"ltr", fontSize: "4vh", marginLeft: "7%", whiteSpace: "normal",marginRight: "7%",fontFamily: "Mate SC"}}>
                Sharing the experience of donating to charity with your children shows them from a young age that they can make positive changes in the world. Children naturally love to help others, so nurturing their innate generosity is likely to mean that they grow up with a greater appreciation of what they have, and will carry on supporting charity in years to come.

Starting a tradition of donating to charity with your children is easy - try creating a family donation box that everyone can add to and nominate a family charity each year, involving the children in choosing which causes to support.
                </p>
                <h2 style={{paddingTop: "1%" , whiteSpace: "nowrap", marginLeft: "6%", fontSize: "4vh", fontWeight: "bold",fontFamily:"Mate SC"}}>
                5 GIVING TO CHARITY ENCOURAGES FRIENDS AND FAMILY TO DO THE SAME:
                </h2>
                <p style={{direction:"ltr", fontSize: "4vh", marginLeft: "7%", whiteSpace: "normal",marginRight: "7%",fontFamily: "Mate SC"}}>
                Your own charitable donations can inspire your nearest and dearest to give to causes important to them, and could even bring about a family-wide effort to back a charity or charities that have special significance to you as a group.

Family giving creates a bond, helping to bolster relationships through a shared goal and raising more money than could otherwise be possible through individual donations. Chances are, many of your family members are already giving to charity, so working together could help you to make even more of a positive impact. We can help you family to set up a family CAF Charitable Trust to make coordinating your donations simple and sustainable.

If this has inspired you to make a donation to charity, we can help. We make it easy to find a charity that’s working for causes important to you; whether you want to make a one-off donation, set up a donation plan or find out how to donate your time.
                </p>

               <h3 style={{paddingTop: "1%" , whiteSpace: "nowrap", marginLeft: "42%", fontSize: "4vh", fontWeight: "bold",fontFamily:"Mate SC"}}>
               START GIVING TODAY
                </h3> 


        </div>
        <div id="footer" style={{ maxWidth:"100%", minWidth: "100%", backgroundColor:"#263273", minHeight:"150px", padding:"32px", paddingTop: "-16px", display: "flex"}}>
        <div style={{display:"grid", minWidth:"30%"}}>

<a href="https://github.com" target = "_blank" style={{alignSelf:"flex-end",display: "table-cell",color:"#fff",fontSize:"16px", margin:"8px"}}>
<GitHubIcon style={{verticalAlign:"top"}}/>
<div style={{display:"inline", verticalAlign:"text-bottom", paddingLeft:"4px"}}>Back-End</div>
</a>
<a href="https://github.com/DabirRahmani/charity_front/tree/develop" target = "_blank" style={{alignSelf:"flex-end",display: "table-cell",color:"#fff",fontSize:"16px", margin:"8px"}}>
<GitHubIcon style={{verticalAlign:"top"}}/>
<div style={{display:"inline", verticalAlign:"text-bottom", paddingLeft:"4px"}}>Front-End</div>
</a>
<a href={"mailto:"+"ntm.patronage@gmail.com"} target = "_blank" style={{alignSelf:"flex-end",display: "table-cell",color:"#fff",fontSize:"16px", margin:"8px"}}>
<AlternateEmailIcon style={{verticalAlign:"top"}}/>
<div style={{display:"inline", verticalAlign:"text-bottom", paddingLeft:"4px"}}>E-mail</div>
</a>
</div>
<div style={{width:"100%", textAlign:"center", alignSelf:"center",color:"#fff"}}>(working on it)</div>
</div>
        </div>
    )
}
export default Mainpage;