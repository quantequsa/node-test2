//console.log("Hello from our JS")
//fetch ("https://dog.ceo/api/breeds/list/all")  //fetch whatever data lives in this url but it is only going to return a promise that can take a long time
//make this operation run in the background hiding it but won't stop or block our other next code from running so it can begin this task then in the future once it completes we can do somehting with it 

//how long or fast someone network connection is, dont know how long this server will take to respond this may take a while and we don't want to tie up and block execution of all of our other code making them wait for it to complete
//Sequential javascript execution one by one 2 + 2 then  10 + 10 then 100 /10 does not take long to execute each one one by one

//
// 2 + 2
//10 + 10
// 100 / 10

//Traditional way 
fetch ("https://dog.ceo/api/breeds/list/all").then(function(response) {   //pass the response of the fetch url into the response parameter inside parenthesis of the function - the initial promise will complete as soon as we hear back from the server at all - we just have basic things like the headers 
   return response.json()     //inside the body return response.json which is the dog api server's response and then we're are calling a method of json as a promise to return the data meaning we want to deal with the actual data that it is sent - this second promise will actually complete when we have the body or the data of the request and we parse it as json
})   //anonymous function() inside the parenthesis() of the then() will not execute until fetch of url completes which there is not way to know???
.then(function(data){   //we can pass the data for parameter metadata
    console.log(data)

})   //we can chain on at the very end here which is another then once the second promise is completed
//sent back from dog api server:  {message: {…}, status: "success"}
//message: {affenpinscher: Array(0), african: Array(0), airedale: Array(0), akita: Array(0), appenzeller: Array(0), …}status: "success"__proto__: Object
//inside property message: list of all of the different dog breeds
// 
start()


//MODERN WAY: using a function definition and call it to execute
//to work with promises we need to be inside an asynchronous function - changing a traditional to Asynchronows function just add async before it so we can use MODERN way inside the body
async function start() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all")  //KEY POINT IS AWAIT prevent the following lines of code from executing next until the promise is fullfilled, returns, resolves and completed first
    2 + 2                                                                //fetch is going to resolve its promise as soon as we hear back from the server at all  
    4 + 4
    10 + 10 
    const data = await response.json()                                   //await until finish here - we just want the json data meat and potatoes of the response server and we want to parse it into a readable format amd we store it in a constant variable called data
    console.log(data)                                                    //once previous step is completed or finished we can do anything we want with that data so we could build an html select drop down
    createBreadList(data.message)   //message property of data contains the the list of dog breeds  send to other functions
   
   
    //we could write out the code to transform the data into an html select right here however lets stay organized into byte-sized single responsibility
    //curly's law 
    //   First function responsibility is to get or fetch the data
    //   second function responsibility is to create the html select let's have 
}
    function createBreadList(breedlist) {   //data.message from api response.json inputs into breedlist parameter metadata to receive called pizza etc breedlist - take this data and create a drop down list html select drop down 
                                            //create some html that we can hook on to with javascript
        //document.getElementById("breed").innerHTML = "string of quotes say hey"           //this is a method wit parameter metadata id of breed - this is an object that represents that "not empty" div and then let's look inside with a dot
                                            //very powerfully overlays or replaces everything inside DIV breed display in html - <div id="breed">
        document.getElementById("breed").innerHTML = `


        <select onchange="loadByBreed(this.value)">   
            <option>Choose a dog breed</option>
            ${Object.keys(breedlist).map(function(breed){
                return `<option>${breed}</option>`       //does this work ok with message sweparated by commas array converted to text will have commas converts an array to a single piece of text so no separtation between items

            }).join('')}                               
            <option>Corgi</option>
            <option>Boxer</option>
            <option>Bulldog</option>
        </select>   
        
        `         //drop down to multiple lines with dynamic back ticks - do something dynamic inside this curly brackets ${}
                  //cannot use map since breedlist is an object with a bunch of propertis but luckily javascript can return an array base on objects property names 
                  //cookie cutter mold for all objects :  Object  so put it in here ${Object} and use for a method call keys() and inside lets put an ohject breedlist so the full result is an array
                  //so now being an array we can still use method map() so it can run once for each item in this array or collection called breedlist 
                  //so we can now provide in parenthesis of map() an anonymous function here in map so we can process each item function is run once for each item
                  //we will pass a parameter in the function called anything breed
                  //EXPLAIN IT LATER .join('')}  SINCE IT MAY NOT BE NEEDED
    }

    async function loadByBreed(breed) {    //we want a fetch but return a promise so we want it to be asynchronous function - uses the key word this points to the element in question abstraction or element that triggered or calling this function
        if (breed != "Choose a dog breed"){   //nothing happens
            //const response = await fetch("https://dog.ceo/api/breed/hound/images") //we don't want it to be hardcoded and be static
            const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`) //we don't want it to be hardcoded we want it dynamic
            const data = await response.json()
            //console.log(data)
            createSlideshow(data.message)
            //alert(breed)
        }
        
    } //each function must be byte-sized and independent

    function createSlideshow(images) {

        //console.log(images)
        document.getElementById("slideshow").innerHTML = `
        <div class="slide" style="background-image: url('https://images.dog.ceo/breeds/boxer/IMG_0002.jpg')"></div>
        <div class="slide" style="background-image: url('${images[0]}')"></div>
        `
    }
