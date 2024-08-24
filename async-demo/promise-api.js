// const p = Promise.resolve({id:1});
// p.then(result => console.log(result));  

// const r = Promise.reject(new Error('reason for rejection...'));
// r.catch(err => console.log(err));

const p1 = new Promise((resolve) => {
    setTimeout(()=>{
        console.log('Async Operation 1...');
        resolve(11);
        // reject(new Error('reason for rejection...'));
    },2000);
})

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async Operation 2...");
    resolve(22);
  }, 2000);
});

Promise.race([p1, p2])
.then(result => console.log(result));
// .catch(err => console.log('Error',err.message));