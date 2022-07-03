<svelte:head>
    <title>Scott's Portfolio</title>
</svelte:head>

<script lang="ts">
    import {crossfade} from 'svelte/transition';
    import { cubicOut } from "svelte/easing";
    import {flip} from "svelte/animate"

    let key = 2;

    const [send, recieve] = crossfade({
        easing: cubicOut,
        duration: 400
    });

    interface TodoItem {
        id: number,
        text: string
    }

    let input: string = '';
    let todos: TodoItem[] = [];
    let finished: TodoItem[] = [];
    let i = 0;

    function handleSubmit() {
        todos = [...todos, {id: i, text: input}];
        i++;
        input = '';
    }

    function handleEnter(event: { key: string; }){
        if (event.key === "Enter"){
            todos = [...todos, {id: i, text: input}];
            i++;
            input = '';
        }
    }

    function handleDone(event: { target: { value: any; }; }){
        for (let index = 0; index < todos.length; index++) {
            if (todos[index].id === parseInt(event.target.value)){
                finished = [...finished, todos[index]]
                todos.splice(index,1);
                todos = todos;
                return;
            }
        }
    }

    function handleDelete(event: { target: { value: string; }; }) {
        for (let index = 0; index < finished.length; index++) {
            if (finished[index].id === parseInt(event.target.value)){
                console.log(finished);
                finished.splice(index,1);
                finished = finished;
                return;
            }
        }
    }
</script>

<h1 style="text-align: center;">Ah yes, the hello world of frameworks</h1>
<div class="input">
    <input type="text" bind:value={input} on:keypress={handleEnter}>
    <button on:click={handleSubmit}>Create</button>
</div>  
<div class="big-container">
    <div class="todo">
        {#each todos as item (item.id)}
            <div class="item" out:send={{key}} animate:flip>
                <p>{item.text}</p>
                <button on:click={handleDone} value={item.id} class="done-button">Done</button>
            </div>
        {:else}
            <div>
                <p></p>
            </div>
        {/each}
    </div>
    <div class="finished">
        {#each finished as item (item.id)}
            <div class="item" in:recieve={{key}} animate:flip>
                <p style="text-decoration: line-through;">{item.text}</p>
                <button on:click={handleDelete} value={item.id} class="done-button">Delete</button>
            </div>
        {:else}
            <div>
                <p></p>
            </div>
        {/each}
    </div>
</div>

<style>
    .big-container{
        display: grid;
        grid-template-columns: 47.5% 5% 47.5%;

    }

    .todo{
        grid-column: 1;
    }

    .finished{
        grid-column: 3;
    }

    .item {
        display: grid;
        grid-template: 100% / 90% 10%;
        border: 1px solid black;
        border-radius: 3px;
        overflow-wrap: break-word;
        margin-bottom: 5px;
    }

    .done-button {
        justify-self: right;
        border-radius: 0px;
        padding: 2px;
        box-shadow: 0px 0px;
        border: 1px solid black;
    }

    p {
        margin: 0px 0px;
        padding: 3px;
    }
    
    .input{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
    }
</style>