const x = document.getElementById("x");
        const o = document.getElementById("o");
        const header = document.getElementById("header");
        const move = document.getElementById("move_alert");

        let xo = null, boxes;


        function clickHandler(event) {
            const ind = parseInt(event.target.id) - 1;
            refresh({position: ind});
        }

        function removeEventListeners() {
            boxes.forEach(div => {
                div.removeEventListener("click", clickHandler);
            });
        }


        function refresh(data = {}){
            const body = new FormData();
            for(const [key, value] of Object.entries(data)){
                body.append(key, value);
                console.log(body);
            }

            fetch("./index.php", {
                method: "POST", body
            })
            .then(res => res.json())
            .then(snap => {
                console.log(snap);
                console.log(xo);
                if(!xo && (snap.X != "0" || snap.O != "0") && !(snap.X == "0" && snap.O == "0")){
                    const shape = snap.X == "0" ? "X" : "O";
                    const least = true;
                    clickedShape(shape, least);
                }
                snap.state.split("").forEach((element, ind) => {
                    boxes[ind].innerHTML = element == "1" ? "O" : element == "2" ? "X" : "";
                });

                switch(snap.last_turn){
                    case "1":
                        xo == "X" ? move.innerHTML = "-&nbsp;Twój ruch&nbsp;-" : move.innerHTML = "-&nbsp;Czekaj na ruch przeciwnika&nbsp;-";
                    break;
                    
                    case "2":
                        xo == "O" ? move.innerHTML = "-&nbsp;Twój ruch&nbsp;-" : move.innerHTML = "-&nbsp;Czekaj na ruch przeciwnika&nbsp;-";
                    break;
                }

                let mark = snap.state;
                if((mark[0] == mark[1] && mark[1] == mark[2] && mark[0] != "0") || (mark[3] == mark[4] && mark[4] == mark[5] && mark[3] != "0")
                || (mark[6] == mark[7] && mark[7] == mark[8] && mark[6] != "0") || (mark[0] == mark[3] && mark[3] == mark[6] && mark[0] != "0") 
                || (mark[1] == mark[4] && mark[4] == mark[7] && mark[1] != "0") || (mark[2] == mark[5] && mark[5] == mark[8] && mark[2] != "0")
                || (mark[0] == mark[4] && mark[4] == mark[8] && mark[0] != "0") || (mark[2] == mark[4] && mark[4] == mark[6] && mark[2] != "0")){
                    removeEventListeners()
                    move.innerHTML = "<img alt='randyyy' src='./randy.gif'>";

                    snap.last_turn == "1" ? header.innerHTML = `Zwyciężają kółka.` : header.innerHTML = `Zwyciężają krzyżyki.`;
                    const doscTego = clearInterval(render);
                }
            })
        }
        const render = setInterval(refresh, 500);


        function clickedShape(shape, secondShape){
            refresh({selected: shape});
            if(secondShape){
                header.innerHTML = `Pozostają Ci ${shape}.`;
            }
            else{
                header.innerHTML = `Grasz jako ${shape}.`;
            }
            xo = shape;
        }

        o.addEventListener("click", ()=>clickedShape("O"));         
        x.addEventListener("click", ()=>clickedShape("X"));  


        boxes = new Array(9).fill(0).map((el, ind) => {
            const div = document.getElementById(ind + 1);
            div.classList.add("plate");
            div.addEventListener("click", clickHandler);
            return div;
        });