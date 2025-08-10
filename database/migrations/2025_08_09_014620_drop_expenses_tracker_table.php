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
       Schema::dropIfExists('expenses_tracker'); // drops the table if it exist
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::create('expenseTracker', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('user_id');
                $table->string('title');
                $table->integer('income');
                $table->timestamp('date_of_transaction_calculation');
                $table->timestamps();


                $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }
};
