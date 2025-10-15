let tasks = [];
const timeQuantum = 2;

// Funzioni di scheduling
// FCFS
function fcfs(tasks){
    let time = 0, results = [];
    tasks.sort((a,b)=>a.arrival - b.arrival);
    for(let t of tasks){
        if(time < t.arrival) time = t.arrival;
        let finish = time + t.burst;
        let tat = finish - t.arrival;        // Turnaround Time
        let wt = tat - t.burst;             // Waiting Time
        results.push({task: t.name, start: time, finish: finish, tat: tat, wt: wt});
        time = finish;
    }
    return results;
}

// SJF (non preemptive)
function sjf(tasks){
    let time = 0, results = [], remaining = [...tasks];
    while(remaining.length > 0){
        let available = remaining.filter(t => t.arrival <= time);
        if(available.length === 0){ time++; continue; }
        let next = available.reduce((a,b) => a.burst < b.burst ? a : b);
        let finish = time + next.burst;
        let tat = finish - next.arrival;
        let wt = tat - next.burst;
        results.push({task: next.name, start: time, finish: finish, tat: tat, wt: wt});
        time = finish;
        remaining.splice(remaining.indexOf(next),1);
    }
    return results;
}

// Priority (non preemptive, min numero = alta priorità)
function priorityScheduling(tasks){
    let time = 0, results = [], remaining = [...tasks];
    while(remaining.length > 0){
        let available = remaining.filter(t => t.arrival <= time);
        if(available.length === 0){ time++; continue; }
        let next = available.reduce((a,b) => a.priority < b.priority ? a : b);
        let finish = time + next.burst;
        let tat = finish - next.arrival;
        let wt = tat - next.burst;
        results.push({task: next.name, start: time, finish: finish, tat: tat, wt: wt});
        time = finish;
        remaining.splice(remaining.indexOf(next),1);
    }
    return results;
}

// Round Robin
function roundRobin(tasks, quantum){
    let time = 0, results = [], queue = [];
    const remaining = tasks.map(t => ({...t, remBurst: t.burst, startTime: null}));
    while(remaining.length > 0 || queue.length > 0){
        remaining.filter(t => t.arrival <= time && !queue.includes(t)).forEach(t => queue.push(t));
        if(queue.length === 0){ time++; continue; }
        let t = queue.shift();
        if(t.startTime === null) t.startTime = time;  // first start
        let runTime = Math.min(quantum, t.remBurst);
        t.remBurst -= runTime;
        let finish = time + runTime;
        results.push({task: t.name, start: time, finish: finish}); // TAT e WT calcolati alla fine
        time += runTime;
        if(t.remBurst > 0) queue.push(t);
        else {
            // Calcolo TAT e WT finale quando finisce
            const lastIndex = results.map(r => r.task).lastIndexOf(t.name);
            results[lastIndex].tat = finish - t.arrival;
            results[lastIndex].wt = (finish - t.arrival) - t.burst;
            remaining.splice(remaining.indexOf(t),1);
        }
    }
    return results;
}
// Funzione per generare task casuali
function generateRandomTasks(n){
    const arr=[];
    for(let i=1;i<=n;i++){
        arr.push({
            id:i,
            name:"Task "+i,
            arrival:Math.floor(Math.random()*10),
            burst:Math.floor(Math.random()*10)+1,
            priority:Math.floor(Math.random()*5)+1
        });
    }
    return arr;
}

// Mostra risultati in tabella
function displayResults(algorithm, data){
    let html=`<h3>${algorithm}</h3>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Task</th>
                <th>Start</th>
                <th>Finish</th>
                <th>Turnaround Time</th>
                <th>Waiting Time</th>
            </tr>
        </thead>
        <tbody>`;
    data.forEach(d=>{
        html+=`<tr>
            <td>${d.task}</td>
            <td>${d.start}</td>
            <td>${d.finish}</td>
            <td>${d.tat}</td>
            <td>${d.wt}</td>
        </tr>`;
    });
    html+="</tbody></table>";
    document.getElementById("results").innerHTML+=html;
}

// Event listeners
document.getElementById("jsonFile").addEventListener("change", async(e)=>{
    const file=e.target.files[0];
    if(file){
        const text=await file.text();
        try{
            tasks=JSON.parse(text);
            alert("File JSON caricato con successo!");
        }catch{
            alert("Errore nel file JSON");
        }
    }
});

document.getElementById("generateTasks").addEventListener("click", ()=>{
    const n=parseInt(document.getElementById("numTasks").value);
    if(isNaN(n)||n<=0){ alert("Inserisci un numero valido"); return; }
    tasks=generateRandomTasks(n);
    alert(n+" task generati");
});

document.getElementById("runButton").addEventListener("click", ()=>{

    const jsonText = document.getElementById("jsonInput").value.trim();
    if(jsonText){
        try{
            tasks = JSON.parse(jsonText);
        }catch(e){
            alert("Errore nel JSON inserito!");
            return;
        }
    }

    if(tasks.length===0){ alert("Nessun task presente"); return; }
    
    document.getElementById("results").innerHTML="";
    if(document.getElementById("fcfsCheck").checked) displayResults("FCFS", fcfs(tasks));
    if(document.getElementById("sjfCheck").checked) displayResults("SJF", sjf(tasks));
    if(document.getElementById("priorityCheck").checked) displayResults("Priority", priorityScheduling(tasks));
    if(document.getElementById("rrCheck").checked) displayResults("Round Robin", roundRobin(tasks, timeQuantum));
});