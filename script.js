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

                <strong>
                    ${call.queue}
                </strong>

                <br>
                
                ANI: ${call.ani}
                
                <br>
                
                <br>

                Wait:
                ${call.wait}

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
    "click",
    updateSelectedCount
);
        container.appendChild(div);

    });

}
function updateSelectedCount() {

    const checked =
        document.querySelectorAll(
            ".callCheckbox:checked"
        ).length;

    console.log(
        "Checked count:",
        checked
    );

    const button =
        document.getElementById(
            "terminateBtn"
        );

    button.innerText =
        `Terminate Selected (${checked})`;

}
renderCalls();

updateSelectedCount();
