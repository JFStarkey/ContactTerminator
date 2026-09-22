const calls = [
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

                Interaction: ${call.interactionId}

            </div>
        `;

        const checkbox =
            div.querySelector(
                ".callCheckbox"
            );

        checkbox.addEventListener(
            "click",
            () => {

                updateSelectedCount();

                updateCardSelection();

            }
        );

        container.appendChild(div);

    });

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

renderCalls();

updateSelectedCount();

document
    .getElementById(
        "refreshBtn"
    )
    .addEventListener(
        "click",
        () => {

            renderCalls();

            updateSelectedCount();

            updateCardSelection();

        }
    );

document
    .getElementById(
        "terminateBtn"
    )
    .addEventListener(
        "click",
        () => {

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

            if (!confirmed)
                return;

            const interactionIds =
                Array.from(selected)
                    .map(
                        checkbox =>
                            checkbox.dataset.id
                    );

            console.log(
                interactionIds
            );

        }
    );
