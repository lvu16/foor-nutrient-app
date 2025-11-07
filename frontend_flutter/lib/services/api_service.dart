import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/food.dart';
import '../models/food_detail.dart';

class ApiService {
  static const String baseUrl = 'http://localhost:8000/api';

  Future<Map<String, dynamic>> searchFoods(String query, {int page = 1}) async {
    try {
      final uri = Uri.parse(
        '$baseUrl/search',
      ).replace(queryParameters: {'query': query, 'page': page.toString()});

      final response = await http.get(uri);

      if (response.statusCode == 200) {
        final data = json.decode(response.body);

        final foods = (data['foods'] as List)
            .map((json) => Food.fromJson(json))
            .toList();

        return {
          'foods': foods,
          'total': data['total'] as int,
          'page': data['page'] as int,
          'pageSize': data['pageSize'] as int,
        };
      } else {
        throw Exception('Failed to search foods: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error connecting to server: $e');
    }
  }

  Future<FoodDetail> getFoodDetail(int fdcId) async {
    try {
      final uri = Uri.parse('$baseUrl/food/$fdcId');
      final response = await http.get(uri);

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        return FoodDetail.fromJson(data);
      } else if (response.statusCode == 404) {
        throw Exception('Food not found');
      } else {
        throw Exception('Failed to load food details: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error connecting to server: $e');
    }
  }
}
