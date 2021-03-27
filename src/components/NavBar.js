import React from "react";

const NavBar = (props) => {
    console.log(props.userInfo)
    let home="";
    let single="";
    let group="";
    let displayGroupMovies=false;
    let saveChanges=false;
    function setActiveTab(tab){
        if (tab==="home"){
            home="active"
            return true;
        } else if (tab==="single"){
            single="active"
            return true;
        }else if(tab==="group"){
            group="active"
            return true;
        } else if(tab==="movieGenerator"){
            single="active";
            saveChanges=true;
            return true;
        } if(tab==="displayGroupMovies"){
            displayGroupMovies=true;
            return true;
        }else{
            group="active";
            saveChanges=true;
            return true;
        }
    }

    setActiveTab(props.activeTab)


    if (displayGroupMovies){
        return (
            <div className="ui blue three item inverted menu" id="navbar">
                <a className={`item ${home}`} onClick={() => props.returnHome(props.groupInfo, [], [], props.saveInfoBoolean, "")}>
                    Home
                </a>
                <a className={`item ${single}`} onClick={() => props.returnHome(props.groupInfo, [], [], props.saveInfoBoolean, "singleViewing")}>
                    Single Viewing
                </a>
                <a className={`item ${group}`} onClick={() => props.returnHome(props.groupInfo, [], [], props.saveInfoBoolean, "group")}>
                    Group Viewing
                </a>
            </div>
        )
    }
    if (!saveChanges) {
        return (
            <div className="ui blue three item inverted menu" id="navbar">
                <a className={`item ${home}`} onClick={() => {
                    props.tabSelect('')
                }}>
                    Home
                </a>
                <a className={`item ${single}`} onClick={() => props.tabSelect('singleViewing')}>
                    Single Viewing
                </a>
                <a className={`item ${group}`} onClick={() => props.tabSelect('group')}>
                    Group Viewing
                </a>
            </div>
        )
    } else{
        return (
            <div className="ui blue three item inverted menu" id="navbar">
                <a className={`item ${home}`} onClick={() => props.returnHome(props.userInfo[props.username].savedMovies, props.userInfo[props.username].deletedMovies, props.userInfo[props.username].lastWatchedMovie, props.saveInfoBoolean, "")}>
                    Home
                </a>
                <a className={`item ${single}`} onClick={() => props.returnHome(props.userInfo[props.username].savedMovies, props.userInfo[props.username].deletedMovies, props.userInfo[props.username].lastWatchedMovie, props.saveInfoBoolean, "singleViewing")}>
                    Single Viewing
                </a>
                <a className={`item ${group}`} onClick={() => props.returnHome(props.userInfo[props.username].savedMovies, props.userInfo[props.username].deletedMovies, props.userInfo[props.username].lastWatchedMovie, props.saveInfoBoolean, "group")}>
                    Group Viewing
                </a>
            </div>
        )
    }
}
export default NavBar;