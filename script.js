let calls = [];

async function loadQueuedCalls() {

    // TEMP DATA
    // Replace with API later

    calls = [
    {
        interactionId: "abc123",
        queue: "Reception",
        ani: "16125551212",
        wait: "00:05:22"
    },
    {
        interactionId: "xyz456",
        queue: "Customer Service",
        ani: "16125559999",
        wait: "00:12:41"
    }
    ];

    renderCalls();
}

function renderCalls() {

    const container =
        document.getElementById("callContainer");

    container.innerHTML = "";

    calls.forEach(call => {

        const card =
            document.createElement("div");

        card.className = "callCard";

        card.innerHTML = `
    <input
        type="checkbox"
        class="callCheckbox"
        data-id="${call.interactionId}"
    >

    <div>
        <strong>${call.queue}</strong>
        <br>
        Queue: ${call.queue}
        <br>
        ANI: ${call.ani}
        <br>
        Wait: ${call.wait}
        <br>
        Interaction: ${call.interactionId}
    </div>
`;

        container.appendChild(card);

    });

    updateCounts();
}

function updateCounts() {

    document.getElementById(
        "callCount"
    ).textContent =
        `Active Calls: ${calls.length}`;

    const selected =
        document.querySelectorAll(
            ".callCheckbox:checked"
        ).length;

    document.getElementById(
        "terminateBtn"
    ).textContent =
        `Terminate Selected (${selected})`;
}

function terminateSelectedCalls() {

    const selected =
        Array.from(
            document.querySelectorAll(
                ".callCheckbox:checked"
            )
        );

    if (selected.length === 0) {

        alert(
            "No contacts selected."
        );

        return;
    }

    const interactionIds =
        selected.map(
            checkbox => checkbox.dataset.id
        );

    console.log(
        "Terminate:",
        interactionIds
    );

    alert(
        `Selected ${interactionIds.length} contact(s)`
    );
}

function refreshCalls() {

    console.log(
        "Refreshing..."
    );

    loadQueuedCalls();
}

document
    .getElementById("refreshBtn")
    .addEventListener(
        "click",
        refreshCalls
    );

document
    .getElementById("terminateBtn")
    .addEventListener(
        "click",
        terminateSelectedCalls
    );

document.addEventListener(
    "change",
    function(event) {

        if (
            event.target.classList.contains(
                "callCheckbox"
            )
        ) {
            updateCounts();
        }

    }
);

loadQueuedCalls();
