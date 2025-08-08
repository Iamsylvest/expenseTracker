<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('expenses_tracker', function (Blueprint $table) {
          
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('title');
            $table->integer('income'); // Total cost or expense amount
            $table->date('date_of_transaction_calculation');
            $table->string('product_name');
            $table->string('unit');
            $table->integer('quantity');
            $table->string('category');
            $table->timestamps();

    // 👉 Set foreign key constraint to users table
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('expenses_tracker');
    }
};
