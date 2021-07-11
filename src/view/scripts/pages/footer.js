import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import GitHubIcon from '@material-ui/icons/GitHub';


const Footer = () => {
    return <div id="footer" style={{ maxWidth: "100%", minWidth: "100%", backgroundColor: "#263273", minHeight: "150px", padding: "32px", paddingTop: "-16px", display: "flex" }}>
        <div style={{ display: "grid", minWidth: "200px" }}>

            <a href="https://github.com/DabirRahmani/charity_back" target="_blank" style={{ alignSelf: "flex-end", display: "table-cell", color: "#fff", fontSize: "16px", margin: "8px" }}>
                <GitHubIcon style={{ verticalAlign: "top" }} />
                <div style={{ display: "inline", verticalAlign: "text-bottom", paddingLeft: "4px" }}>Back-End</div>
            </a>
            <a href="https://github.com/DabirRahmani/charity_front" target="_blank" style={{ alignSelf: "flex-end", display: "table-cell", color: "#fff", fontSize: "16px", margin: "8px" }}>
                <GitHubIcon style={{ verticalAlign: "top" }} />
                <div style={{ display: "inline", verticalAlign: "text-bottom", paddingLeft: "4px" }}>Front-End</div>
            </a>
            <a href={"mailto:" + "ntm.patronage@gmail.com"} target="_blank" style={{ alignSelf: "flex-end", display: "table-cell", color: "#fff", fontSize: "16px", margin: "8px" }}>
                <AlternateEmailIcon style={{ verticalAlign: "top" }} />
                <div style={{ display: "inline", verticalAlign: "text-bottom", paddingLeft: "4px" }}>E-mail</div>
            </a>
        </div>
        <div style={{fontSize: "20px", width: "100%", textAlign: "center", alignSelf: "center", color: "#fff", display: "flex", alignItems: "flex-start", flexDirection: "column"}}>

            <div>
            About Us: A team of junior back-end (Django) and front-end (ReactJS) developers.
            </div>

            <div>
            Back-End: Ehsan Karbasian and Amir Reza SattarZade

            </div>

            <div>
            Front-End: Zahra MahmoudZade, Amin MirAbadi and Muhammad Rahmani
            </div>

            <div>
            You can find us on github or contact us via Email.
            </div>


        </div>
    </div>
}


export default Footer