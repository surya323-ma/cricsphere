from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import numpy as np
import json

app = Flask(__name__)
CORS(app)

# Match Prediction Model (Mock)
class MatchPredictor:
    def predict(self, team1, team2, format_type='ODI'):
        """Mock prediction - returns random probabilities"""
        team1_win_prob = np.random.uniform(0.4, 0.6)
        team2_win_prob = 1 - team1_win_prob
        
        return {
            'team1': team1,
            'team2': team2,
            'format': format_type,
            'team1_win_probability': round(team1_win_prob * 100, 2),
            'team2_win_probability': round(team2_win_prob * 100, 2),
            'prediction': team1 if team1_win_prob > 0.5 else team2,
            'confidence': round(max(team1_win_prob, team2_win_prob) * 100, 2)
        }

predictor = MatchPredictor()

# Routes
@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'Python ML Service Running ✅',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0'
    })

@app.route('/api/predict/match', methods=['POST'])
def predict_match():
    try:
        data = request.json
        team1 = data.get('team1')
        team2 = data.get('team2')
        format_type = data.get('format', 'ODI')
        
        prediction = predictor.predict(team1, team2, format_type)
        return jsonify(prediction)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/stats/trends', methods=['GET'])
def get_trends():
    try:
        # Mock trending data
        trends = {
            'top_performers': [
                {'player': 'Virat Kohli', 'avg_runs': 52.5},
                {'player': 'Babar Azam', 'avg_runs': 48.3},
                {'player': 'Kane Williamson', 'avg_runs': 50.1}
            ],
            'team_rankings': [
                {'rank': 1, 'team': 'India', 'points': 110},
                {'rank': 2, 'team': 'Australia', 'points': 105},
                {'rank': 3, 'team': 'Pakistan', 'points': 95}
            ],
            'format_stats': {
                'Test': {'average_runs': 300, 'avg_duration': '5 days'},
                'ODI': {'average_runs': 280, 'avg_duration': '8 hours'},
                'T20': {'average_runs': 160, 'avg_duration': '3.5 hours'}
            }
        }
        return jsonify(trends)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/analytics/player/<name>', methods=['GET'])
def player_analytics(name):
    try:
        analytics = {
            'player': name,
            'matches_played': np.random.randint(50, 200),
            'total_runs': np.random.randint(2000, 10000),
            'average': round(np.random.uniform(25, 60), 2),
            'century_count': np.random.randint(0, 20),
            'recent_form': ['Out', 'Runs: 45', 'Runs: 89', 'Runs: 32', 'Out'],
            'career_graph': {
                'years': [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
                'average': [35.2, 38.5, 40.1, 42.3, 45.6, 48.2, 50.1, 52.3, 51.8, 52.1]
            }
        }
        return jsonify(analytics)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/recommendations', methods=['POST'])
def get_recommendations():
    try:
        data = request.json
        preferences = data.get('preferences', {})
        
        recommendations = {
            'players_to_watch': ['Virat Kohli', 'Babar Azam', 'Kane Williamson'],
            'upcoming_matches': [
                {'team1': 'India', 'team2': 'Australia', 'date': '2024-09-10'},
                {'team1': 'Pakistan', 'team2': 'England', 'date': '2024-09-12'}
            ],
            'must_read_articles': [
                'Top 10 Batsmen of 2024',
                'Analysis: India vs Australia Series',
                'Rising Stars in Cricket'
            ]
        }
        return jsonify(recommendations)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
