// ===========================================
// CONTACT TERMINATOR
// VERSION 2 FOUNDATION
// ===========================================

let calls = [];

// ===========================================
// LOAD DATA
// ===========================================

const QUEUED_TASKS_QUERY = `
{
  taskDetails(
    from: START_TIME
    to: END_TIME
    filter: {
      and: [
        { channelType: { equals: telephony } }
        { status: { equals: "parked" } }
        { direction: { equals: "inbound" } }
        { isActive: { equals: true } }
      ]
    }
  ) {
    tasks {
      id
      origin
      destination
      isActive
      direction
      owner {
        id
        name
      }
      lastEntryPoint {
        id
        name
      }
    }
  }
}
`;

async function loadQueuedCalls() {

    try {

        console.log(
            "Loading queued calls..."
        );

        const testResponse = {
            tasks: [
                {
                    id: "abc123",
                    origin: "16125551212",
                    lastEntryPoint: {
                        name: "Customer Service"
                    }
                },
                {
                    id: "xyz456",
                    origin: "16125559999",
                    lastEntryPoint: {
                        name: "Tech Support"
                    }
                }
            ]
        };

        calls =
            testResponse.tasks.map(
                task => ({
                    interactionId: task.id,
                    queue: task.lastEntryPoint?.name || "Unknown",
                    ani: task.origin,
                    wait: "00:00:00"
                })
            );

        renderCalls();

        updateSelectedCount();

        updateCardSelection();

    }
    catch(error) {

        console.error(
            "Load failed:",
            error
        );

    }

}
// ===========================================
// RENDER CALLS
// ===========================================

function renderCalls() {

    const container =
        document.getElementById(
            "callContainer"
        );

    container.innerHTML = "";

    calls.forEach(call => {

        const div =
            document.createElement(
                "div"
            );

        div.className =
            "callCard";

        div.innerHTML = `
            <input
                type="checkbox"
                class="callCheckbox"
                data-id="${call.interactionId}"
            >

            <div>

                <strong>${call.queue}</strong>

                <br>

                ANI: ${call.ani}

                <br><br>

                Wait: ${call.wait}

                <br>

                Interaction:
                ${call.interactionId}

            </div>
        `;

        const checkbox =
            div.querySelector(
                ".callCheckbox"
            );

        checkbox.addEventListener(
            "change",
            handleCheckboxChange
        );

        container.appendChild(
            div
        );

    });

    updateCallCount();

}

// ===========================================
// COUNTERS
// ===========================================

function updateCallCount() {

    document.getElementById(
        "callCount"
    ).innerText =
        `Active Calls: ${calls.length}`;

}

function updateSelectedCount() {

    const checked =
        document.querySelectorAll(
            ".callCheckbox:checked"
        ).length;

    document.getElementById(
        "terminateBtn"
    ).innerText =
        `Terminate Selected (${checked})`;

}

// ===========================================
// CARD HIGHLIGHTING
// ===========================================

function updateCardSelection() {

    document
        .querySelectorAll(
            ".callCheckbox"
        )
        .forEach(
            checkbox => {

                const card =
                    checkbox.closest(
                        ".callCard"
                    );

                if (
                    checkbox.checked
                ) {

                    card.classList.add(
                        "selected"
                    );

                }
                else {

                    card.classList.remove(
                        "selected"
                    );

                }

            }
        );

}

// ===========================================
// CHECKBOX EVENT
// ===========================================

function handleCheckboxChange() {

    updateSelectedCount();

    updateCardSelection();

}

// ===========================================
// REFRESH
// ===========================================

function refreshCalls() {

    console.log(
        "Refresh requested"
    );

    loadQueuedCalls();

}

// ===========================================
// TERMINATE
// ===========================================

function terminateSelectedCalls() {

    const selected =
        document.querySelectorAll(
            ".callCheckbox:checked"
        );

    if (
        selected.length === 0
    ) {

        alert(
            "No contacts selected."
        );

        return;

    }

    const confirmed =
        confirm(
            `Terminate ${selected.length} contact(s)?`
        );

    if (
        !confirmed
    ) {
        return;
    }

    const interactionIds =
        Array.from(selected)
        .map(
            checkbox =>
                checkbox.dataset.id
        );

    console.log(
        "Terminate these:",
        interactionIds
    );

    // Later:
    // End Task API call goes here

}

// ===========================================
// STARTUP
// ===========================================

document
    .getElementById(
        "refreshBtn"
    )
    .addEventListener(
        "click",
        refreshCalls
    );

document
    .getElementById(
        "terminateBtn"
    )
    .addEventListener(
        "click",
        terminateSelectedCalls
    );

loadQueuedCalls();

updateSelectedCount();
