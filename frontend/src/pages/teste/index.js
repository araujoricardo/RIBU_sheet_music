import React from "react";
import Vex from "vexflow";


export default class Teste extends React.Component{
    constructor(props){
        super(props)
        this.canvasRef = React.createRef();
        this.ctx = null;
    }

    componentDidMount(){
        this.renderVF();
    };

    renderVF = ()=>{
        const VF = Vex.Flow;

        const canvas = this.canvasRef.current;
        this.ctx = canvas.getContext("2d");
        this.ctx.fillStyle = "#7F7F7F"
        this.ctx.fillRect(0,0, 300, 300);






        // We created an object to store the information about the workspace
        var WorkspaceInformation = {
            // The <canvas> element in which you're going to work
            canvas: this.canvasRef.current,
            // canvas: document.getElementById("some-canvas-id"),
            // Vex creates a canvas with specific dimensions
            canvasWidth: 500,
            canvasHeight: 500
        };

        // Create a renderer with Canvas
        const renderer = new VF.Renderer(
            canvas, VF.Renderer.Backends.CANVAS
        );

        // Use the renderer to give the dimensions to the canvas
        renderer.resize(WorkspaceInformation.canvasWidth, WorkspaceInformation.canvasHeight);

        // Expose the context of the renderer
        var context = renderer.getContext();

        // And give some style to our canvas
        context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");


        /**
         * Creating a new stave
         */
        // Create a stave of width 400 at position x10, y40 on the canvas.
        var stave = new VF.Stave(10, 40, 400);
        // Add a clef and time signature.
        stave.addClef("treble").addTimeSignature("4/4");
        // Set the context of the stave our previous exposed context and execute the method draw !
        stave.setContext(context).draw();

        var stave2 = new VF.Stave(10, 150, 400);
        // Add a clef and time signature.
        stave2.addClef("bass").addTimeSignature("4/4");
        // Set the context of the stave our previous exposed context and execute the method draw !
        stave2.setContext(context).draw();





        var notes = [
            // A quarter-note C.
            new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "8"}),
        
            // // A quarter-note D.
            // new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "8" }),

            // // // A quarter-note rest. Note that the key (b/4) specifies the vertical
            // // // position of the rest.
            new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "4", dots: 1 }).addDot(0),
        
            // A C-Major chord.
            new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "4" }),
            new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "4" })
        ];
        
        // Create a voice in 4/4 and add above notes
        var voice = new VF.Voice({num_beats: 4, beat_value: 4});
        voice.addTickables(notes);
        
        // Format and justify the notes to 400 pixels.
        var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);
        
        // Render voice
        voice.draw(context, stave);

    }


    render(){

        return(
            <div>
                <canvas ref={this.canvasRef} width="500" height="500"></canvas>

            </div>
        );
    };


};