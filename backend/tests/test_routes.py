import pytest
import json

def test_generate_endpoint(client):
    """Test the generate endpoint"""
    response = client.post('/api/generate', 
                         json={'url': 'https://hyp.io/'})
    
    assert response.status_code == 200
    data = json.loads(response.data)
    
    assert 'usps' in data
    assert 'status' in data
    assert data['status'] == 'success'
    assert isinstance(data['usps'], list)

def test_generate_invalid_url(client):
    """Test generate endpoint with invalid URL"""
    response = client.post('/api/generate', 
                         json={'url': 'not-a-valid-url'})
    
    assert response.status_code == 400
    data = json.loads(response.data)
    assert 'error' in data

def test_generate_script_endpoint(client):
    """Test the script generation endpoint"""
    test_data = {
        'url': 'https://example.com',
        'usps': [
            'Feature 1',
            'Feature 2',
            'Feature 3'
        ]
    }
    
    response = client.post('/api/generate-script', 
                         json=test_data)
    
    assert response.status_code == 200
    data = json.loads(response.data)
    
    assert 'script' in data
    assert 'status' in data
    assert data['status'] == 'success'
    assert isinstance(data['script'], str) 