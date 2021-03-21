import React from "react";

const NavBar = (props) => {
    let home="";
    let single="";
    let group="";
    let saveChanges=false;
    function setActiveTab(tab){
        if (tab==="home"){
            home="active"
        } else if (tab==="single"){
            single="active"
        }else if(tab==="group"){
            group="active"
        } else if(tab==="movieGenerator"){
            single="active";
            saveChanges=true;
        } else{
            group="active";
            saveChanges=true;
        }
    }


    setActiveTab(props.activeTab)
    if (!saveChanges) {
        return (
            <div className="ui blue three item inverted menu">
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
            <div className="ui blue three item inverted menu">
                <a className={`item ${home}`} onClick={() => props.returnHome(props.userInfo[props.username].savedMovies, props.userInfo[props.username].deletedMovies, props.userInfo[props.username].lastWatchedMovie, props.saveInfoBoolean, "")}>
                    Home
                </a>
                <a className={`item ${single}`} onClick={() => props.returnHome(props.userInfo[props.username].savedMovies, props.userInfo[props.username].deletedMovies, props.userInfo[props.username].lastWatchedMovie, props.saveInfoBoolean, "single")}>
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