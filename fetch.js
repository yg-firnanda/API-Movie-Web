const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', function() {

    const inputKeyword = document.querySelector('.input-keyword')
    fetch('http://www.omdbapi.com/?apikey=c3b0711e&s=' + inputKeyword.value) // fetch adalah fungsi di javascript yang mengembalikan promise. Ketika datanya dapet tidak langsung dijalanakn
        // Mengubah data menjadi JSON, menggunakna method json()
        // .then(response => console.log(response.json()))
        // Jika ingin menjalankan promise secara asynchronous, maka perlu dijalankan lagi dalam method .then()
        .then(response => response.json())
        // .then(response => console.log(response)); // Jika di console.log, seharusnya bentuknya sudah object
        .then(response => {
            const movies = response.Search;
            let cards = '';
            movies.forEach( m => cards +=  showCards(m));
            const movieContainer = document.querySelector('.movie-container');
            movieContainer.innerHTML = cards;

            // Ketika tombol Show detail di klik
            const modalDetailButton = document.querySelectorAll('.modal-detail-button');
            // modalDetailButton tidak bisa langsung diberi addEventListener, karena berbentuk nodeList bukan single element, sehingga harus di loop dulu dgn menggunakan forEach
            // Tiap tombol di representasikan dengan 'btn'
            modalDetailButton.forEach(btn => {
                // Menggunakan function biasa, karena butuh 'this'
                // console.log(this); // Memastikan tombol yg diklik sesuai dengan id-nya
                btn.addEventListener('click', function() {

                    const imdbid = this.dataset.imdbid;
                    // console.log(imdbid);
                    fetch('http://www.omdbapi.com/?apikey=c3b0711e&i=' + imdbid)
                        .then( response => response.json())
                        // .then( response => console.log(response))
                        //
                        .then( s => {
                            const movieDetail = showMovieDetails(s);
                            const modalBody = document.querySelector('.modal-body');
                            modalBody.innerHTML = movieDetail;
                        });
                });  
            });
        });

    function showCards( m ) {
        return `<div class="col-md-4 my-3">
                    <div class="card" style="width: 18rem;">
                        <img src="${m.Poster}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">${m.Title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                            <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
                        </div>
                    </div>
                </div>`;
    }
    function showMovieDetails( s ) {
        return `<div class="container-fluid">
                    <div class="row">
                        <div class="col-md-3">
                            <img src="${s.Poster}" class="img-fluid">
                        </div>
                        <div class="col-md">
                            <ul class="list-group">
                                <li class="list-group-item">${s.Title} (${s.Year})</li>
                                <li class="list-group-item"><b>Director : </b> ${s.Director}</li>
                                <li class="list-group-item"><b>Actors : </b> ${s.Actors} </li>
                                <li class="list-group-item"><b>Writer : </b> ${s.Writer}</li>
                                <li class="list-group-item"><b>Plot : </b><br>${s.Plot}</li>
                            </ul>
                        </div>
                    </div>
                </div>`;
    }
})
