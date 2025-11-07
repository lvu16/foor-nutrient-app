import 'package:flutter/material.dart';
import '../models/food.dart';
import '../services/api_service.dart';
import '../widgets/search_bar_widget.dart';
import '../widgets/food_card.dart';
import '../widgets/loading_widget.dart';
import '../widgets/error_widget.dart';
import 'food_detail_screen.dart';

class SearchScreen extends StatefulWidget {
  const SearchScreen({Key? key}) : super(key: key);

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  final ApiService _apiService = ApiService();

  List<Food> _foods = [];
  int _total = 0;
  int _currentPage = 1;
  int _pageSize = 20;
  String _currentQuery = '';

  bool _isLoading = false;
  String? _error;
  bool _hasSearched = false;

  Future<void> _performSearch(String query, {int page = 1}) async {
    setState(() {
      _isLoading = true;
      _error = null;
      _currentQuery = query;
      _currentPage = page;
      if (page == 1) _hasSearched = true;
    });

    try {
      final result = await _apiService.searchFoods(query, page: page);

      setState(() {
        _foods = result['foods'] as List<Food>;
        _total = result['total'] as int;
        _currentPage = result['page'] as int;
        _pageSize = result['pageSize'] as int;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _error = e.toString();
        _foods = [];
        _total = 0;
        _isLoading = false;
      });
    }
  }

  void _handlePageChange(int newPage) {
    if (_currentQuery.isNotEmpty) {
      _performSearch(_currentQuery, page: newPage);
    }
  }

  int get _totalPages => (_total / _pageSize).ceil();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF5F7FA),
      appBar: AppBar(
        title: const Text('Food Information Search'),
        centerTitle: true,
        backgroundColor: Colors.white,
        elevation: 0,
      ),
      body: Column(
        children: [
          // Header
          Container(
            color: Colors.white,
            padding: const EdgeInsets.only(bottom: 16),
            child: const Text(
              'Search for foods to view detailed nutritional information',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 16, color: Colors.grey),
            ),
          ),

          // Search Bar (Fixed - doesn't scroll)
          SearchBarWidget(
            onSearch: (query) => _performSearch(query),
            isLoading: _isLoading,
          ),

          // Content (Scrollable)
          Expanded(child: _buildContent()),
        ],
      ),
    );
  }

  Widget _buildContent() {
    if (_isLoading) {
      return const LoadingWidget(message: 'Searching for foods...');
    }

    if (_error != null) {
      return ErrorDisplayWidget(
        message: _error!,
        onRetry: () => _performSearch(_currentQuery, page: _currentPage),
      );
    }

    if (!_hasSearched) {
      return _buildWelcomeScreen();
    }

    if (_foods.isEmpty) {
      return const Center(
        child: Text(
          'No foods found. Try a different search term!',
          style: TextStyle(fontSize: 16, color: Colors.grey),
        ),
      );
    }

    // ✅ FIX: Use CustomScrollView for proper scrolling
    return CustomScrollView(
      slivers: [
        // Results header
        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Search Results',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                ),
                Text(
                  '$_total ${_total == 1 ? 'result' : 'results'} found',
                  style: const TextStyle(fontSize: 14, color: Colors.grey),
                ),
              ],
            ),
          ),
        ),

        // Results list (scrollable)
        SliverList(
          delegate: SliverChildBuilderDelegate((context, index) {
            final food = _foods[index];
            return FoodCard(
              food: food,
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => FoodDetailScreen(fdcId: food.fdcId),
                  ),
                );
              },
            );
          }, childCount: _foods.length),
        ),

        // Pagination (at bottom, scrollable)
        if (_totalPages > 1) SliverToBoxAdapter(child: _buildPagination()),
      ],
    );
  }

  Widget _buildWelcomeScreen() {
    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const SizedBox(height: 60),
            const Text('🔍', style: TextStyle(fontSize: 64)),
            const SizedBox(height: 16),
            const Text(
              'Start Your Search',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            const Text(
              'Enter a food name in the search bar above to get started!',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 16, color: Colors.grey),
            ),
            const SizedBox(height: 32),
            const Text(
              'Try searching for:',
              style: TextStyle(fontSize: 14, color: Colors.grey),
            ),
            const SizedBox(height: 16),
            Wrap(
              spacing: 12,
              runSpacing: 12,
              alignment: WrapAlignment.center,
              children: [
                _buildExampleChip('Banana'),
                _buildExampleChip('Chicken'),
                _buildExampleChip('Apple'),
                _buildExampleChip('Milk'),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildExampleChip(String text) {
    return ActionChip(
      label: Text(text),
      onPressed: () => _performSearch(text),
      backgroundColor: Colors.blue,
      labelStyle: const TextStyle(color: Colors.white),
    );
  }

  Widget _buildPagination() {
    return Container(
      padding: const EdgeInsets.all(20),
      margin: const EdgeInsets.only(top: 16),
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.1),
            spreadRadius: 1,
            blurRadius: 4,
          ),
        ],
      ),
      child: Column(
        children: [
          Text(
            'Showing ${(_currentPage - 1) * _pageSize + 1}-${_currentPage * _pageSize > _total ? _total : _currentPage * _pageSize} of $_total results',
            style: const TextStyle(fontSize: 14, color: Colors.grey),
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ElevatedButton.icon(
                onPressed: _currentPage > 1
                    ? () => _handlePageChange(_currentPage - 1)
                    : null,
                icon: const Icon(Icons.arrow_back),
                label: const Text('Previous'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blue,
                  disabledBackgroundColor: Colors.grey,
                ),
              ),
              const SizedBox(width: 16),
              Text(
                'Page $_currentPage of $_totalPages',
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                ),
              ),
              const SizedBox(width: 16),
              ElevatedButton.icon(
                onPressed: _currentPage < _totalPages
                    ? () => _handlePageChange(_currentPage + 1)
                    : null,
                icon: const Icon(Icons.arrow_forward),
                label: const Text('Next'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blue,
                  disabledBackgroundColor: Colors.grey,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
