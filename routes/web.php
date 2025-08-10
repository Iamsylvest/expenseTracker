<?php

use App\Http\Controllers\ExpensesTrackerController;
use App\Http\Controllers\ProfileController;
use App\Models\ExpensesTracker;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


        // Your expenses POST route inside auth middleware group
Route::post('/expenses', [ExpensesTrackerController::class, 'store'])->name('expenses.store');

Route::get('/expensesDetailsLatestJson', [ExpensesTrackerController::class, 'getLatestExpensesDetailsJson'])->name('expensesDetails.latestJson');
Route::get('/allExpensesDetailsJson', [ExpensesTrackerController::class, 'getAllExpensesDetails'])->name('allExpensesDetails.latestJson');
Route::delete('/api/transactions/{transactionId}', [ExpensesTrackerController::class, 'deleteTransaction'])->name('deleteTransaction');
});



require __DIR__.'/auth.php';
