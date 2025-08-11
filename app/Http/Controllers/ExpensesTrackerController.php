<?php

namespace App\Http\Controllers;
use Inertia\Inertia;    // <-- add this line here
use App\Models\ExpensesTracker;
use Illuminate\Http\Request;

class ExpensesTrackerController extends Controller
{
    
        public function store(Request $request){
            // validate incoming request
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'income' => 'required|numeric',
                'date' => 'required|date',
                'products' => 'required|array',
                'products.*.product_name' => 'required|string|max:255',
                'products.*.unit' => 'required|string|max:50',
                'products.*.quantity' => 'required|numeric|min:0',
                'products.*.price' => 'required|numeric|min:0',
                'products.*.category' => 'required|string|max:255',


            ]);
                // 2. Create the main expense record
    // Assuming you have authenticated user and your ExpensesTracker has user_id field

                        $expense = ExpensesTracker::create([
                            'user_id' => auth()->id(),
                            'title' => $validated['title'],
                            'income' => $validated['income'],
                            'date_of_transaction_calculation' => $validated['date'],
                        ]);

              // 3. Create the related products using the relationship
    // This will automatically set expenses_tracker_id foreign key in products table         
    
                    $expense->products()->createMany($validated['products']);
                       // 4. Return response (redirect, JSON, or Inertia response)
                       return redirect()->route('dashboard')->with('success', 'Expenses and products saved successfully!');
        }

        public function getAllExpensesDetails(Request $request)
        {
            // Number of records per page for pagination
            $perPage = 10;
        
            // Get the currently authenticated user's ID
            $userId = auth()->id();
        
            // Start building the query: include related 'products' and filter by user ID
            $query = ExpensesTracker::with('products')
                ->where('user_id', $userId);
        
            // If the 'search' parameter is provided and not empty, apply filters
            if ($request->filled('search')) {
        
                // Store the search term in a variable for reuse
                $searchTerm = $request->search;
        
                // Add a grouped WHERE condition to the query
                $query->where(function ($q) use ($searchTerm) {
                    // Search in 'title' column (on expenses_tracker)
                    $q->where('title', 'like', "%{$searchTerm}%")
                    
                      // OR search in related products table for product_name or category
                      ->orWhereHas('products', function ($q2) use ($searchTerm) {
                          $q2->where('product_name', 'like', "%{$searchTerm}%")
                             ->orWhere('category', 'like', "%{$searchTerm}%");
                      });
                });
            }
        
            // Order by the latest updated records and paginate results
            return response()->json(
                $query->orderBy('updated_at', 'desc')->paginate($perPage)
            );
        }
   
        public function getLatestExpensesDetailsJson(Request $request)
        {
        // Get all ExpensesTracker records updated within the last 24 hours
        $latestExpenses = ExpensesTracker::with('products')
                ->latest('updated_at')
                ->first();
       
            return response()->json([
                'expenses' => $latestExpenses,
            ]);
        }


        public function deleteTransaction($transactionId){

            $transaction =ExpensesTracker::find($transactionId);

            if (!$transaction) {
                return response()->json(['message' => 'Transaction not found'], 404);
            }

                    $transaction->delete(); // deletes the record
                return response()->json(['message' => 'Transaction deleted successfully']);
            
        }

}
