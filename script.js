let complaints =
JSON.parse(localStorage.getItem("complaints"))
|| [];

displayComplaints();

function submitComplaint(){

    let student =
    document.getElementById("studentName").value;

    let type =
    document.getElementById("complaintType").value;

    let description =
    document.getElementById("description").value;

    if(student==="" || description===""){
        alert("Fill all fields");
        return;
    }

    let complaint = {
        id:"CMP"+Date.now(),
        student:student,
        type:type,
        description:description,
        status:"Pending"
    };

    complaints.push(complaint);

    localStorage.setItem(
        "complaints",
        JSON.stringify(complaints)
    );

    alert(
        "Complaint Submitted\nID: "
        + complaint.id
    );

    displayComplaints();

    document.getElementById("studentName").value="";
    document.getElementById("description").value="";
}

function displayComplaints(){

    let list =
    document.getElementById("complaintList");

    list.innerHTML="";

    complaints.forEach((c,index)=>{

        list.innerHTML += `
        <div class="card">
            <p><b>ID:</b> ${c.id}</p>
            <p><b>Name:</b> ${c.student}</p>
            <p><b>Type:</b> ${c.type}</p>
            <p><b>Status:</b> ${c.status}</p>

            <button onclick="updateStatus(${index})">
            Resolve
            </button>
        </div>
        `;
    });
}

function updateStatus(index){

    complaints[index].status="Resolved";

    localStorage.setItem(
        "complaints",
        JSON.stringify(complaints)
    );

    displayComplaints();
}

function trackComplaint(){

    let id =
    document.getElementById("searchId").value;

    let result =
    document.getElementById("trackResult");

    let complaint =
    complaints.find(c => c.id === id);

    if(complaint){

        result.innerHTML=`
        <div class="card">
            <p><b>ID:</b> ${complaint.id}</p>
            <p><b>Name:</b> ${complaint.student}</p>
            <p><b>Status:</b> ${complaint.status}</p>
        </div>
        `;
    }
    else{
        result.innerHTML=
        "<p>Complaint Not Found</p>";
    }
}