// ===========================================
// CONTACT TERMINATOR
// VERSION 2 FOUNDATION
// ===========================================

let calls = [];
let accessToken = null;

// ===========================================
// LOAD DATA
// ===========================================

async function loadQueuedCalls() {

    calls = [
        {
            interactionId: "abc123",
            queue: "Customer Service",
            ani: "16125551212",
            wait: "00:00:00"
        },
        {
            interactionId: "xyz456",
            queue: "Tech Support",
            ani: "16125559999",
            wait: "00:00:00"
        }
    ];

    console.log("Calls Loaded:", calls);

    renderCalls();

    updateSelectedCount();

    updateCardSelection();

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

    updateCallCount(
