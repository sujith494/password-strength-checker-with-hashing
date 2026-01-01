class PacketAnalyzer {
    constructor() {
        this.ws = null;
        this.packets = [];
        this.running = false;
        this.protocolFilter = 'all';
        this.byteCount = 0;
        this.packetCount = 0;
        
        // DOM elements
        this.packetList = document.getElementById('packetList');
        this.packetCountElement = document.getElementById('packetCount');
        this.byteCountElement = document.getElementById('byteCount');
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.protocolFilterSelect = document.getElementById('protocolFilter');
        
        // Event listeners
        this.startBtn.addEventListener('click', () => this.startCapture());
        this.stopBtn.addEventListener('click', () => this.stopCapture());
        this.protocolFilterSelect.addEventListener('change', 
            (e) => this.setProtocolFilter(e.target.value));
        
        // Initialize WebSocket connection
        this.connect();
    }
    
    connect() {
        try {
            // In production, use actual WebSocket endpoint
            // For demo purposes, we'll simulate data
            this.ws = {
                send: (data) => {},
                close: () => {}
            };
            
            console.log('Connected to packet capture service');
        } catch (error) {
            console.error('Connection error:', error);
        }
    }
    
    startCapture() {
        if (this.running) return;
        
        this.running = true;
        this.packets = [];
        this.byteCount = 0;
        this.packetCount = 0;
        this.packetList.innerHTML = '';
        
        // Simulate packet capture
        this.captureLoop();
        
        console.log('Packet capture started');
    }
    
    stopCapture() {
        this.running = false;
        console.log('Packet capture stopped');
    }
    
    setProtocolFilter(protocol) {
        this.protocolFilter = protocol;
        this.filterPackets();
    }
    
    captureLoop() {
        if (!this.running) return;
        
        // Simulate packet generation
        const protocols = ['http', 'dns', 'tcp', 'udp'];
        const protocol = this.protocolFilter === 'all' ? 
            protocols[Math.floor(Math.random() * protocols.length)] : 
            this.protocolFilter;
            
        const packet = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            protocol: protocol,
            srcIp: ${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)},
            dstIp: ${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)},
            srcPort: Math.floor(Math.random() * 65536),
            dstPort: Math.floor(Math.random() * 65536),
            bytes: Math.floor(Math.random() * 1000),
            payload: Simulated ${protocol} packet payload
        };
        
        this.addPacket(packet);
        setTimeout(() => this.captureLoop(), 500);
    }
    
    addPacket(packet) {
        this.packets.push(packet);
        this.byteCount += packet.bytes;
        this.packetCount++;
        
        this.updateStats();
        this.renderPacket(packet);
    }
    
    renderPacket(packet) {
        const packetElement = document.createElement('div');
        packetElement.className = packet-item ${packet.protocol};
        
        packetElement.innerHTML = `
            <div class="packet-header">
                <span class="packet-protocol">${packet.protocol.toUpperCase()}</span>
                <span>${new Date(packet.timestamp).toLocaleTimeString()}</span>
            </div>
            <div class="packet-details">
                <div>${packet.srcIp}:${packet.srcPort} → ${packet.dstIp}:${packet.dstPort}</div>
                <div>${packet.bytes} bytes</div>
            </div>
            <div class="packet-payload">${packet.payload}</div>
        `;
        
        this.packetList.appendChild(packetElement);
        this.packetList.scrollTop = this.packetList.scrollHeight;
    }
    
    filterPackets() {
        const filtered = this.protocolFilter === 'all' ? 
            this.packets : 
            this.packets.filter(p => p.protocol === this.protocolFilter);
            
        this.packetList.innerHTML = '';
        filtered.forEach(this.renderPacket.bind(this));
    }
    
    updateStats() {
        this.packetCountElement.textContent = this.packetCount;
        this.byteCountElement.textContent = this.byteCount;
    }
}

// Initialize analyzer when page loads
document.addEventListener('DOMContentLoaded', () => {
    new PacketAnalyzer();
});
