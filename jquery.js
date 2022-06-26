$('.search-button').on('click', function() {

    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=c3b0711e&s=' + $('.input-keyword').val(), // Artinya: JQuery tolong carikan saya kelas input-keyword, lalu ambil apapun valuaenya (Apapun yg diketikan), kemudian kirim ke AJAX
        // Setelah method success adalah callback
        success: results => {
            console.log(results);
            const movies = results.Search; // Dalam JSON Terdapat Key Search-nya, padahal yg dibutuhkan hanya array of object aja, sehingga bisa disimpan dalam variabel bernama movies.
            let cards = '';
            movies.forEach(m => {
                cards += showCards(m);
                        // Ketika tombol ini di klik, maka akan request AJAX  sambil mengirim data ImdBID-nya, agar tombol tahu berapa data imdbID-nya, maka tambahkan attribut "data-namadata" didalam tag a (tombol). Isi attribut data dengan imdbID, penulisan sesuai di JSON Postman API
            });
            $('.movie-container').html(cards);
    
            // Ketika tombol Show Detail di klik
            $('.modal-detail-button').on('click', function ( ) { // lebih baik tidak menggunakan arrow function pada kondisi ini, karena arrow function tidak punya scope this. Terkadang ketika menggunakan Event Handler seperti ini membutuhkan this
                //Ketika ada Event Handler akan lakukan callback(berupa method success didalam AJAX berikut).
                // Jalankan AJAX lagi
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=c3b0711e&i=' + $(this).data('imdbid'), // Artinya: JQuery ambil tombol ini, lalu ambil atribut data imdb-nya.
                     success: s => { // Karena resultsnya tidak ada key Search-nya, maka bisa langsung tulis s. Sebenarnya nama variabel boleh apa saja, tidak selalu s.
                        const movieDetail = showMovieDetails(s);
                        $('.modal-body').html(movieDetail);
                    },
                    error: (e) => {
                        console.log(e.responseText);
                    }
                })
            });
        },
        error: (e) => {
            console.log(e.responseText)
        }
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

