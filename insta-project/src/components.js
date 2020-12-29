import React, {Component} from "react";
import Header from "./header";
import MyDropzone from "./drop-zone";
import DragNDrop from "./drag-n-drop";
import base from "./base";
import WindowSize from "./drag-n-drop";

class Components extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
        }
    }

    componentDidMount() {
        this.ref = base.syncState(`files`, {
            context: this,
            state: "files",
        });
    }

    onFile = (files) => {
        this.setState({
            files: files,
        });
    };
    resetDb = () => {
        this.setState({
            files: [],
        });
    }

    render() {
        let data = [
            {title: 'group 1', items: Object.keys(this.state.files)},
        ]

        if(WindowSize < 767 ){
            return (
                <DragNDrop data={data} resetDb={this.resetDb} fileList={this.state.files}/>
            )
        } else{
            return (
                <div className="App">
                    <Header />
                    <section className="container drop-zone">
                        <MyDropzone onFile={this.onFile}/>
                    </section>
                    <DragNDrop data={data} resetDb={this.resetDb} fileList={this.state.files}/>
                    <section className="container">
                        <div className="dnd-container">
                        </div>
                        {/*/!*<div className="">*!/url(*/}
                        {/*    /!*{window.)location.href = "https://api.instagram.com/oauth/authorize?app_id=591081928384246&redirect_uri=https://andrewsotnikow.github.io/&scope=user_profile,user_media&response_type=code"}*!/*/}

                        {/*</div>*/}
                    </section>

                </div>
            );
        }


    }
}

export default Components;




