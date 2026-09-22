// ===========================================
// CONTACT TERMINATOR
// VERSION 2 FOUNDATION
// ===========================================

let calls = [];

// ===========================================
// LOAD DATA
// ===========================================

async function loadQueuedCalls() {

    console.log(
        "Loading queued calls..."
    );

    try {

        //
        // Temporary test data
        //

        calls = [
            {
                interactionId: "abc123",
                queue: "Customer Service",
                wait: "04:32:14",
                ani: "16125551212"
            },
            {
                interactionId: "xyz456",
                queue: "Tech Support",
                wait: "00:15:22",
                ani: "16125559999"
            }
        ];

        renderCalls();

        updateSelectedCount();

        updateCardSelection();

    }
    catch(error) {

        console.error(
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
