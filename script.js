const API_URL = "http://localhost:5000/leads";

const leadsContainer = document.getElementById("leadsContainer");
const totalLeads = document.getElementById("totalLeads");
const contactedLeads = document.getElementById("contactedLeads");
const convertedLeads = document.getElementById("convertedLeads");
const searchInput = document.getElementById("search");

// Fetch all leads
async function fetchLeads() {
    try {
        const response = await fetch(API_URL);
        const leads = await response.json();

        renderLeads(leads);
        updateStats(leads);

    } catch (error) {
        console.error("Error fetching leads:", error);
    }
}

// Render leads
function renderLeads(leads) {
    const searchText = searchInput.value.toLowerCase();

    const filteredLeads = leads.filter(lead =>
        lead.name.toLowerCase().includes(searchText)
    );

    leadsContainer.innerHTML = "";

    if (filteredLeads.length === 0) {
        leadsContainer.innerHTML = "<p>No leads found.</p>";
        return;
    }

    filteredLeads.forEach(lead => {
        const card = document.createElement("div");
        card.className = "lead-card";

        let statusClass = "new";

        if (lead.status === "Contacted") {
            statusClass = "contacted";
        } else if (lead.status === "Converted") {
            statusClass = "converted";
        }

        card.innerHTML = `
            <h3>${lead.name}</h3>
            <p>Email: ${lead.email}</p>
            <p class="status ${statusClass}">Status: ${lead.status}</p>

            <div class="button-group">
                <button class="contact-btn" onclick="markContacted(${lead.id})">
                    Contacted
                </button>

                <button class="convert-btn" onclick="markConverted(${lead.id})">
                    Converted
                </button>

                <button class="delete-btn" onclick="deleteLead(${lead.id})">
                    Delete
                </button>
            </div>
        `;

        leadsContainer.appendChild(card);
    });
}

// Update statistics
function updateStats(leads) {
    totalLeads.textContent = leads.length;

    const contacted = leads.filter(
        lead => lead.status === "Contacted"
    ).length;

    const converted = leads.filter(
        lead => lead.status === "Converted"
    ).length;

    contactedLeads.textContent = contacted;
    convertedLeads.textContent = converted;
}

// Add new lead
async function addLead() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name || !email) {
        alert("Please fill all fields");
        return;
    }

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email
            })
        });

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";

        fetchLeads();

    } catch (error) {
        console.error("Error adding lead:", error);
    }
}

// Mark as Contacted
async function markContacted(id) {
    try {
        await fetch(`${API_URL}/${id}/contacted`, {
            method: "PUT"
        });

        fetchLeads();

    } catch (error) {
        console.error("Error updating status:", error);
    }
}

// Mark as Converted
async function markConverted(id) {
    try {
        await fetch(`${API_URL}/${id}/converted`, {
            method: "PUT"
        });

        fetchLeads();

    } catch (error) {
        console.error("Error updating status:", error);
    }
}

// Delete lead
async function deleteLead(id) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        fetchLeads();

    } catch (error) {
        console.error("Error deleting lead:", error);
    }
}

// Search leads
searchInput.addEventListener("input", fetchLeads);

// Load on page start
fetchLeads();