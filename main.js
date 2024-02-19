const x = document.getElementById('x');
            const o = document.getElementById('o');
            const header = document.getElementById("header");

            let xo = null, boxes;


            function refresh(data = {}){
                const body = new FormData();
                for(const [key, value] of Object.entries(data)){
                    body.append(key, value);
                }

                fetch('./index.php', {
                    method: "POST", body
                })
                .then(res => res.json())
                .then(snap => {
                    if(!xo && (snap.X != '0' || snap.O != '0') && !(snap.X == '0' && snap.O == '0')){
                        const shape = snap.X == '0' ? 'X' : 'O';
                        console.log(shape);
                        clickedShape(shape);
                    }

                    snap.state.split("").forEach((element, ind) => {
                        boxes[ind].innerHTML = element == '1' ? 'O' : element == '2' ? 'X' : '';
                        
                    });
                    console.log(snap);
                })
            }
            setInterval(refresh, 800);


            function clickedShape(shape){
                if(xo){
                    return;
                }
                refresh({selected: shape});
                header.innerHTML = `Grasz jako ${shape}.`;
                xo = shape;
            }


            o.addEventListener("click", ()=>clickedShape('O'));         
            x.addEventListener("click", ()=>clickedShape('X'));  


            boxes = new Array(9).fill(0).map((el, ind) =>{
                const div = document.getElementById(ind + 1);
                div.classList.add("plate");
                div.onclick = ()=>refresh({position: ind});
                return div;
            });
            // console.log(boxes);