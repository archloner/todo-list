package tdsm;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping(path = "/api", produces = "application/json")
@CrossOrigin(origins = "http://localhost:5173")
public class ApiController {

    @GetMapping("/time")
    public ResponseEntity<String> getServerTimeStamp() {
        return ResponseEntity.ok(LocalDateTime.now().toString());
    }

}
