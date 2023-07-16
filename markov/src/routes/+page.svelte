<script>
    import {TextConfiguration} from "../lib/markov.js"
	let length = 100;
    let startInput = "";
    let files;

    let txtFileContents = "";

    function readTXTFile(){
        var fr = new FileReader();
        fr.onload=function(){
            txtFileContents = fr.result;
            txtFileContents = txtFileContents.replace("\n", "");
        }
        fr.readAsText(files[0]);
    }

    $: if (files) {
        readTXTFile();
    }

	$: Config = new TextConfiguration(txtFileContents);
    $: text = Config.generateText(startInput,length);

</script>

<main class="justify-center items-center flex flex-col gap-12 p-4">
    <div class="form-control">
        <h2 class="text-xl font-bold">Upload .txt file to train Markov Chains</h2>
        <input type="file" class="file-input file-input-bordered file-input-primary w-full max-w-xs" accept=".txt" bind:files={files} />
    </div>
    <div class="form-control flex flex-row gap-4">
        <fieldset class="flex flex-col gap-2">
            <label class="text-lg font-bold" for="startWord">First word (Must be in the uploaded .txt file):</label>
            <input type="text" class="input input-bordered input-primary" id="startWord" name="startWord" bind:value={startInput} placeholder={Config.splitText[0]}>
        </fieldset>
        <fieldset class="flex flex-col gap-2">
            <label class="text-lg font-bold" for="length">How many words to generate:</label>
            <input type="number" min="2" max="5000" class="input input-bordered input-primary" id="length" name="length" bind:value={length}>
        </fieldset>
    </div>
    <div class="mockup-window border border-base-300 w-6/12">
        <div class="flex px-4 py-4 border-t border-base-300 break-words"><span>{text}</span></div>
    </div>
</main>