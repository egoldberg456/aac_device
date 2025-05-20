const buttonConfig = {
    buttons: [
        {
            id: "yes",
            text: "Yes",
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzRDQUY1MCI+PHBhdGggZD0iTTkgMTYuMTdMNC44MyAxMmwtMS40MiAxLjQxTDkgMTkgMjEgN2wtMS40MS0xLjQxeiIvPjwvc3ZnPg==",
            color: "#4CAF50"
        },
        {
            id: "no",
            text: "No",
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0Y0NDMzNiI+PHBhdGggZD0iTTE5IDYuNDFMMTcuNTkgNSAxMiAxMC41OSA2LjQxIDUgNSA2LjQxIDEwLjU5IDEyIDUgMTcuNTkgNi40MSAxOSAxMiAxMy40MSAxNy41OSAxOSAxOSAxNy41OSAxMy40MSAxMnoiLz48L3N2Zz4=",
            color: "#F44336"
        },
        {
            id: "help",
            text: "Help",
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzIxOTZGMiI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTEgMTdoLTJ2LTJoMnYyem0yLjA3LTcuNzVsLS45LjkyQzEzLjQ1IDEyLjkgMTMgMTMuNSAxMyAxNmgydi0uNWMwLTEuMS40NS0yLjEgMS4xNy0yLjgzTDE2LjU5IDEzYy4zOC0uMzkuNTktLjkyLjU5LTEuNDUgMC0xLjEtLjktMi0yLTJzLTIgLjktMiAySDhjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNGMwIDEuMDgtLjQxIDIuMDctMS4wNyAyLjgxeiIvPjwvc3ZnPg==",
            color: "#2196F3"
        },
        {
            id: "more",
            text: "More",
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0ZGOTgwMCI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTUgMTFoLTR2NGgtMnYtNEg3di0yaDRWN2gydjRINHYyaDF6Ii8+PC9zdmc+",
            color: "#FF9800"
        },
        {
            id: "done",
            text: "Done",
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzlDMjdCMCI+PHBhdGggZD0iTTkgMTYuMTdMNC44MyAxMmwtMS40MiAxLjQxTDkgMTkgMjEgN2wtMS40MS0xLjQxeiIvPjwvc3ZnPg==",
            color: "#9C27B0"
        },
        {
            id: "please",
            text: "Please",
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0U5MUU2MyI+PHBhdGggZD0iTTEyIDIxLjM1bC0xLjQ1LTEuMzJDNS40IDE1LjM2IDIgMTIuMjggMiA4LjUgMiA1LjQyIDQuNDIgMyA3LjUgM2MxLjc0IDAgMy40MS44MSA0LjUgMi4wOUMxMy4wOSAzLjgxIDE0Ljc2IDMgMTYuNSAzIDE5LjU4IDMgMjIgNS40MiAyMiA4LjVjMCAzLjc4LTMuNCA2Ljg2LTguNTUgMTEuNTRMMTIgMjEuMzV6Ii8+PC9zdmc+",
            color: "#E91E63"
        },
        {
            id: "thank_you",
            text: "Thank You",
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzAwQkNENCI+PHBhdGggZD0iTTEyIDIxLjM1bC0xLjQ1LTEuMzJDNS40IDE1LjM2IDIgMTIuMjggMiA4LjUgMiA1LjQyIDQuNDIgMyA3LjUgM2MxLjc0IDAgMy40MS44MSA0LjUgMi4wOUMxMy4wOSAzLjgxIDE0Ljc2IDMgMTYuNSAzIDE5LjU4IDMgMjIgNS40MiAyMiA4LjVjMCAzLjc4LTMuNCA2Ljg2LTguNTUgMTEuNTRMMTIgMjEuMzV6Ii8+PC9zdmc+",
            color: "#00BCD4"
        },
        {
            id: "hungry",
            text: "I'm Hungry",
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0ZGNTcyMiI+PHBhdGggZD0iTTExIDlIMHYyaDExVjl6bTAgNEgwdjJoMTF2LTJ6bTAgNEgwdjJoMTF2LTJ6bTAgNEgwdjJoMTF2LTJ6bTEzLTZoLTZ2Mmg2di0yem0wLTZoLTZ2Mmg2di0yem0wLTZoLTZ2Mmg2di0yeiIvPjwvc3ZnPg==",
            color: "#FF5722"
        },
        {
            id: "thirsty",
            text: "I'm Thirsty",
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzAwOTY4OCI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bS0xIDE0aDJ2MkgxMXYtMnptMi4wNy03Ljc1bC0uOS45MkMxMy40NSAxMC45IDEzIDExLjUgMTMgMTNoMnYtLjVjMC0xLjEuNDUtMi4xIDEuMTctMi44M0wxNi41OSAxMGMuMzgtLjM5LjU5LS45Mi41OS0xLjQ1IDAtMS4xLS45LTItMi0ycy0yIC45LTIgMkg4YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDRjMCAxLjA4LS40MSAyLjA3LTEuMDcgMi44MXoiLz48L3N2Zz4=",
            color: "#009688"
        },
        {
            id: "bathroom",
            text: "Bathroom",
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzc5NTU0OCI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bS0xIDE0aDJ2MkgxMXYtMnptMi4wNy03Ljc1bC0uOS45MkMxMy40NSAxMC45IDEzIDExLjUgMTMgMTNoMnYtLjVjMC0xLjEuNDUtMi4xIDEuMTctMi44M0wxNi41OSAxMGMuMzgtLjM5LjU5LS45Mi41OS0xLjQ1IDAtMS4xLS45LTItMi0ycy0yIC45LTIgMkg4YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDRjMCAxLjA4LS40MSAyLjA3LTEuMDcgMi44MXoiLz48L3N2Zz4=",
            color: "#795548"
        }
    ]
}; 