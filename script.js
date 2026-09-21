const calls = [

    {
        interactionId: "abc123",

        queue: "Customer Service",

        wait: "04:32:14"
    },

    {
        interactionId: "xyz456",

        queue: "Tech Support",

        wait: "00:15:22"
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
                data-id="${call.interactionId}"
            >

            <div>

                <strong>
                    ${call.queue}
                </strong>

                <br>

                Wait:
                ${call.wait}

                <br>

                Interaction:
                ${call.interactionId}

            </div>
        `;

        container.appendChild(div);

    });

}

renderCalls();
