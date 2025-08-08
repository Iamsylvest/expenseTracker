<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExpensesTracker extends Model
{
    use HasFactory;

// Defines which attributes can be mass-assigned (fillable via create() or update())
protected $fillable = [
    'user_id',                         // The ID of the user who owns this expense
    'title',                           // Title or label for the expense/income entry
    'income',                          // The income amount (optional field, could be zero if it's an expense)
    'date_of_transaction_calculation',// The date the transaction was made
    'product_name',                    // Name of the product related to the expense
    'unit',                            // Unit type (e.g., pieces, kg, etc.)
    'quantity',                        // Quantity of the product
    'category'                         // Category of the expense (e.g., Food, Utilities, etc.)
];

// This defines a relationship: each expense record BELONGS TO one user
public function user(){
    return $this->belongsTo(User::class);
}

}
