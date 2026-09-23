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
    catch (error) {

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
            "change
